/**
 * Преобразует заголовки запроса в объект Headers для передачи в fetch
 * @param source - Источник заголовков (Request, Headers, объект или null/undefined)
 * @param options - Настройки обработки заголовков
 * @returns Новый объект Headers готовый для использования в fetch
 */
export function forwardHeaders(
  source: Request | Headers | Record<string, string> | null | undefined,
  options: {
    /** Заголовки для исключения (регистронезависимо) */
    exclude?: string[];
    /** Дополнительные заголовки для добавления */
    include?: Record<string, string>;
    /** Установить Content-Type: application/json если его нет */
    ensureJsonContentType?: boolean;
    /** Принудительно установить Content-Type: application/json */
    forceJsonContentType?: boolean;
    /** Кастомная функция фильтрации заголовков */
    filter?: (key: string, value: string) => boolean;
  } = {}
): Headers {
  const {
    exclude = ['host', 'connection', 'content-length', 'transfer-encoding'],
    include = {},
    ensureJsonContentType = false,
    forceJsonContentType = false,
    filter,
  } = options;

  // Создаем Set для быстрого поиска исключаемых заголовков (в нижнем регистре)
  const excludeSet = new Set(exclude.map((header) => header.toLowerCase()));

  // Создаем новый объект Headers
  const result = new Headers();

  // Извлекаем заголовки из источника
  const sourceHeaders = extractHeaders(source);

  if (sourceHeaders) {
    copyFilteredHeaders(sourceHeaders, result, excludeSet, filter);
  }

  // Обрабатываем Content-Type согласно настройкам
  handleContentType(result, forceJsonContentType, ensureJsonContentType);

  // Добавляем дополнительные заголовки (они имеют приоритет)
  addIncludeHeaders(result, include);

  return result;
}

/**
 * Извлекает заголовки из различных источников
 */
function extractHeaders(
  source: Request | Headers | Record<string, string> | null | undefined
): Headers | Record<string, string> | null {
  if (!source) {
    return null;
  }

  if (source instanceof Request) {
    return source.headers;
  }

  if (source instanceof Headers) {
    return source;
  }

  if (typeof source === 'object') {
    return source;
  }

  return null;
}

/**
 * Копирует заголовки с применением фильтров
 */
function copyFilteredHeaders(
  sourceHeaders: Headers | Record<string, string>,
  target: Headers,
  excludeSet: Set<string>,
  customFilter?: (key: string, value: string) => boolean
): void {
  if (sourceHeaders instanceof Headers) {
    sourceHeaders.forEach((value, key) => {
      if (shouldIncludeHeader(key, value, excludeSet, customFilter)) {
        target.set(key, value);
      }
    });
  } else {
    Object.entries(sourceHeaders).forEach(([key, value]) => {
      if (
        typeof value === 'string' &&
        shouldIncludeHeader(key, value, excludeSet, customFilter)
      ) {
        target.set(key, value);
      }
    });
  }
}

/**
 * Определяет, должен ли заголовок быть включен
 */
function shouldIncludeHeader(
  key: string,
  value: string,
  excludeSet: Set<string>,
  customFilter?: (key: string, value: string) => boolean
): boolean {
  // Проверяем список исключений
  if (excludeSet.has(key.toLowerCase())) {
    return false;
  }

  // Применяем кастомный фильтр если есть
  if (customFilter && !customFilter(key, value)) {
    return false;
  }

  return true;
}

/**
 * Обрабатывает Content-Type согласно настройкам
 */
function handleContentType(
  headers: Headers,
  forceJson: boolean,
  ensureJson: boolean
): void {
  if (forceJson) {
    headers.set('Content-Type', 'application/json');
  } else if (ensureJson && !headers.has('content-type')) {
    headers.set('Content-Type', 'application/json');
  }
}

/**
 * Добавляет дополнительные заголовки
 */
function addIncludeHeaders(
  headers: Headers,
  include: Record<string, string>
): void {
  Object.entries(include).forEach(([key, value]) => {
    headers.set(key, value);
  });
}

/**
 * Улучшенная вспомогательная функция для отправки запроса с пересылкой заголовков
 */
export async function fetchWithForwardedHeaders(
  url: string,
  originalRequest: Request,
  options: {
    method?: string;
    body?: unknown;
    excludeHeaders?: string[];
    includeHeaders?: Record<string, string>;
    ensureJsonContentType?: boolean;
    timeout?: number;
  } = {}
): Promise<Response> {
  const {
    method = originalRequest.method,
    excludeHeaders,
    includeHeaders,
    ensureJsonContentType = true,
    timeout = 30000,
  } = options;

  // Подготавливаем тело запроса
  let body = options.body;
  if (
    body === undefined &&
    ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())
  ) {
    body = await safelyExtractRequestBody(originalRequest);
  }

  // Подготавливаем заголовки
  const headers = forwardHeaders(originalRequest, {
    exclude: excludeHeaders,
    include: includeHeaders,
    ensureJsonContentType: body !== undefined && ensureJsonContentType,
  });

  // Создаем контроллер для таймаута
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Безопасно извлекает тело запроса
 */
async function safelyExtractRequestBody(request: Request): Promise<unknown> {
  try {
    // Проверяем, можно ли прочитать тело
    if (request.bodyUsed) {
      console.warn('Request body has already been consumed');
      return undefined;
    }

    const clonedRequest = request.clone();
    const contentType =
      request.headers.get('content-type')?.toLowerCase() || '';

    if (contentType.includes('application/json')) {
      return await clonedRequest.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await clonedRequest.formData();
      return Object.fromEntries(formData.entries());
    } else if (contentType.includes('text/')) {
      return await clonedRequest.text();
    } else {
      // For other content types, return as text
      return await clonedRequest.text();
    }
  } catch (error) {
    console.warn('Failed to extract request body:', error);
    return undefined;
  }
}

// Дополнительные утилиты для работы с заголовками

/**
 * Создает Headers объект только с определенными заголовками
 */
export function pickHeaders(
  source: Request | Headers | Record<string, string>,
  keys: string[]
): Headers {
  const keySet = new Set(keys.map((key) => key.toLowerCase()));

  return forwardHeaders(source, {
    filter: (key) => keySet.has(key.toLowerCase()),
  });
}

/**
 * Создает Headers объект исключая определенные заголовки
 */
export function omitHeaders(
  source: Request | Headers | Record<string, string>,
  keys: string[]
): Headers {
  return forwardHeaders(source, {
    exclude: keys,
  });
}

/**
 * Объединяет несколько источников заголовков (последние имеют приоритет)
 */
export function mergeHeaders(
  ...sources: (Request | Headers | Record<string, string> | null | undefined)[]
): Headers {
  const result = new Headers();

  sources.forEach((source) => {
    if (source) {
      const headers = forwardHeaders(source);
      headers.forEach((value, key) => {
        result.set(key, value);
      });
    }
  });

  return result;
}
