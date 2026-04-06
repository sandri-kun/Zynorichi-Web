import { ImageResponse } from 'next/og';
import { seoConfig } from '@/config/seo';

/**
 * Generates a dynamic OG image using next/og.
 */
export function generateDynamicOgImage(title: string, description?: string) {
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
          backgroundColor: '#fff',
          backgroundImage: 'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0,0,0,0.05)',
            maxWidth: '80%',
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              color: '#1a202c',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 30,
                color: '#4a5568',
                textAlign: 'center',
              }}
            >
              {description}
            </div>
          )}
          <div
            style={{
              marginTop: 40,
              fontSize: 24,
              color: '#2d3748',
              fontWeight: 'bold',
            }}
          >
            {seoConfig.siteName}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
