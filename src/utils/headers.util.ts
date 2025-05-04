/**
 * Преобразует заголовки запроса в объект для передачи в fetch
 * @param req - Запрос или объект заголовков
 * @param options - Дополнительные настройки
 * @returns Объект заголовков для использования в fetch
 */
export function forwardHeaders(
  req: Request | Headers | Record<string, string> | null | undefined,
  options: {
    /** Заголовки, которые нужно исключить из пересылки */
    exclude?: string[];
    /** Дополнительные заголовки, которые нужно добавить */
    additional?: Record<string, string>;
    /** Заменить существующий Content-Type или нет */
    setContentTypeJSON?: boolean;
  } = {},
): Headers {
  // Устанавливаем значения по умолчанию
  const { exclude = ['host', 'connection', 'content-length'], additional = {}, setContentTypeJSON = true } = options;

  // Создаем новый объект Headers
  const headers = new Headers();

  // Определяем объект заголовков на основе входных данных
  let headerSource: Headers | Record<string, string> | null = null;

  if (req instanceof Request) {
    // Если передан объект Request, извлекаем заголовки
    headerSource = req.headers;
  } else if (req instanceof Headers) {
    // Если передан объект Headers, используем его напрямую
    headerSource = req;
  } else if (req && typeof req === 'object') {
    // Если передан обычный объект, используем его как есть
    headerSource = req;
  }

  // Обрабатываем заголовки в зависимости от типа источника
  if (headerSource instanceof Headers) {
    // Для объектов Headers используем метод forEach
    headerSource.forEach((value, key) => {
      if (!exclude.includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    });
  } else if (headerSource) {
    // Для обычных объектов итерируем по ключам/значениям
    Object.entries(headerSource).forEach(([key, value]) => {
      // Игнорируем не строковые значения и исключенные заголовки
      if (typeof value === 'string' && !exclude.includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    });
  }

  // Устанавливаем Content-Type: application/json если это требуется
  if (setContentTypeJSON) {
    headers.set('Content-Type', 'application/json');
  }

  // Добавляем дополнительные заголовки
  Object.entries(additional).forEach(([key, value]) => {
    headers.set(key, value);
  });

  return headers;
}

/**
 * Вспомогательная функция для отправки запроса с пересылкой заголовков
 * @param url - URL для запроса
 * @param originalRequest - Исходный запрос
 * @param options - Дополнительные настройки
 * @returns Promise с результатом запроса
 */
export async function fetchWithForwardedHeaders(
  url: string,
  originalRequest: Request,
  options: {
    /** Метод запроса (по умолчанию тот же, что и в originalRequest) */
    method?: string;
    /** Тело запроса (по умолчанию то же, что и в originalRequest) */
    body?: unknown;
    /** Заголовки для исключения */
    excludeHeaders?: string[];
    /** Дополнительные заголовки */
    additionalHeaders?: Record<string, string>;
  } = {},
): Promise<Response> {
  const method = options.method || originalRequest.method;

  let body = options.body;
  if (body === undefined && ['POST', 'PUT', 'PATCH'].includes(method)) {
    try {
      // Попытка клонировать тело запроса
      // Примечание: тело запроса может быть прочитано только один раз
      const clonedRequest = originalRequest.clone();
      body = await clonedRequest.json();
    } catch (error) {
      console.warn('Failed to clone request body:', error);
    }
  }

  const headers = forwardHeaders(originalRequest, {
    exclude: options.excludeHeaders,
    additional: options.additionalHeaders,
    setContentTypeJSON: true,
  });

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  return response;
}
