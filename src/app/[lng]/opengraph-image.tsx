import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { Locale } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

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
    namespace: MESSAGE_FILES.COMMON,
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
            display: 'flex',
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
            display: 'flex',
          }}
        />

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
              display: 'flex',
              alignItems: 'center',
              marginBottom: 32,
              fontWeight: 800,
              fontSize: 84,
              lineHeight: 1.1,
              gap: 8,
            }}
          >
            <svg width="76" height="94" viewBox="0 0 39 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M38.3392 22.9984C38.2505 18.8467 36.5586 14.8953 33.6259 11.9909C30.6932 9.08643 26.753 7.45996 22.6496 7.45996C18.5462 7.45996 14.606 9.08643 11.6733 11.9909C8.74057 14.8953 7.04862 18.8467 6.95996 22.9984V23.8213C7.4142 36.878 19.0486 47.9254 22.6532 47.9254C26.2579 47.9254 37.885 36.878 38.3172 23.7991C38.3319 23.5371 38.3392 23.2702 38.3392 22.9984Z"
                fill="#7AF2A6"
              />
              <path
                d="M33.2108 17.8089C33.1221 13.6573 31.4302 9.70588 28.4975 6.80143C25.5647 3.89698 21.6246 2.27051 17.5212 2.27051C13.4178 2.27051 9.47759 3.89698 6.54487 6.80143C3.61215 9.70588 1.9202 13.6573 1.83154 17.8089V18.6319C2.28578 31.6886 13.9202 42.7359 17.5248 42.7359C21.1294 42.7359 32.7565 31.6885 33.1888 18.6096C33.2035 18.3477 33.2108 18.0808 33.2108 17.8089Z"
                stroke="#088537"
                strokeWidth="1.44133"
              />
              <path
                d="M17.3636 23.0144C19.7469 23.0144 21.6789 21.0592 21.6789 18.6473C21.6789 16.2355 19.7469 14.2803 17.3636 14.2803C14.9804 14.2803 13.0483 16.2355 13.0483 18.6473C13.0483 21.0592 14.9804 23.0144 17.3636 23.0144Z"
                stroke="#088537"
                strokeWidth="0.576532"
              />
            </svg>
            <span style={{ color: '#018f37', display: 'flex' }}>Green</span>
            <span style={{ color: '#1f2937', display: 'flex' }}>Bus</span>
          </div>

          <div
            style={{
              fontSize: 36,
              color: '#4b5563',
              lineHeight: 1.3,
              marginBottom: 40,
              fontWeight: '400',
              display: 'flex',
            }}
          >
            {t('og-image.subtitle')}
          </div>

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
              <div style={{ fontSize: 24, display: 'flex' }}>✅</div>
              <div style={{ fontSize: 24, color: '#6b7280', display: 'flex' }}>{t('og-image.features.online')}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 24, display: 'flex' }}>🌍</div>
              <div style={{ fontSize: 24, color: '#6b7280', display: 'flex' }}>{t('og-image.features.europe')}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 24, display: 'flex' }}>⚡</div>
              <div style={{ fontSize: 24, color: '#6b7280', display: 'flex' }}>{t('og-image.features.reliable')}</div>
            </div>
          </div>

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
                display: 'flex',
              }}
            >
              {`greenbus.com.ua/${lng}`}
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
