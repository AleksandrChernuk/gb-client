'use client';

import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: '100vh',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            padding: '40px 60px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '64px', margin: 0, color: '#111827' }}>404</h1>
          <p style={{ fontSize: '18px', color: '#6b7280', marginTop: '10px' }}>Page not found</p>
          <Button asChild variant={'default'}>
            <Link href={'/'}>Home</Link>
          </Button>
        </div>
      </body>
    </html>
  );
}
