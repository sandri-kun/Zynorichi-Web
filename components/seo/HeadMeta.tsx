// Komponen ini bisa digunakan untuk menginjeksi tag spesifik yang tidak bisa 
// dicover oleh default Metadata Next.js (seperti custom script).
// Tapi mayoritas meta tags sudah dihandle oleh constructMetadata di layout.tsx.

import React from 'react';

export function HeadMeta() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#ffffff" />
      {/* Inject custom tags here if needed */}
    </>
  );
}
