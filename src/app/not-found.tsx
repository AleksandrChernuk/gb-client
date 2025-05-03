'use client';

import { Button } from '@/components/ui/button';
import Error from 'next/error';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404}>
          <Button>Gohome</Button>
        </Error>
        ;
      </body>
    </html>
  );
}
