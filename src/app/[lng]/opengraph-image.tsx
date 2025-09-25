import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { Locale } from 'next-intl';

export const alt = 'GreenBus';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

interface Props {
  params: { lng: Locale };
}

export default async function Image({ params }: Props) {
  const { lng } = await params;

  const t = await getTranslations({
    locale: lng,
    namespace: 'common',
  });

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
          position: 'relative',
        }}
      >
        {/* Декоративные элементы */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            backgroundColor: '#018f37',
            opacity: 0.1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -50,
            left: -80,
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: '#059669',
            opacity: 0.08,
          }}
        />

        {/* Главный контейнер */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px',
            maxWidth: '1000px',
          }}
        >
          {/* Логотип */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: '28px',
              backgroundColor: '#018f37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 48,
              boxShadow: '0 20px 40px rgba(1, 143, 55, 0.3)',
            }}
          >
            <div
              style={{
                fontSize: 70,
                color: 'white',
              }}
            >
              🚌
            </div>
          </div>

          {/* Основной заголовок */}
          <div
            style={{
              fontSize: 84,
              fontWeight: 'bold',
              color: '#1f2937',
              lineHeight: 1.1,
              marginBottom: 32,
              letterSpacing: '-0.02em',
            }}
          >
            GreenBus
          </div>

          {/* Подзаголовок */}
          <div
            style={{
              fontSize: 36,
              color: '#4b5563',
              lineHeight: 1.3,
              marginBottom: 40,
              fontWeight: '400',
            }}
          >
            {t('subtitle')}
          </div>

          {/* Особенности */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 40,
              marginBottom: 40,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 24 }}>✅</div>
              <div style={{ fontSize: 24, color: '#6b7280' }}>{t('features.online')}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 24 }}>🌍</div>
              <div style={{ fontSize: 24, color: '#6b7280' }}>{t('features.europe')}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 24 }}>⚡</div>
              <div style={{ fontSize: 24, color: '#6b7280' }}>{t('features.reliable')}</div>
            </div>
          </div>

          {/* Домен */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px 40px',
              backgroundColor: 'rgba(1, 143, 55, 0.1)',
              borderRadius: '60px',
              border: '3px solid rgba(1, 143, 55, 0.2)',
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: '#018f37',
                fontWeight: 'bold',
              }}
            >
              greenbus.com.ua
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
