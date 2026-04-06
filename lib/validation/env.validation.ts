import { validateString } from './helpers';

export function validateEnv() {
  const requiredEnvs = [
    'ADMIN_USER',
    'ADMIN_PASS',
  ];
  
  const missing = requiredEnvs.filter(env => !validateString(process.env[env]));
  
  if (missing.length > 0) {
    console.warn(`[Peringatan] Environment variables berikut belum diatur: ${missing.join(', ')}`);
  }
}
