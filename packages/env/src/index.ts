import { z } from 'zod';

// 포트는 각 앱의 package.json 스크립트에서 정한다. 아래는 로컬 개발용 기본값.
const defaultApiUrl = 'http://localhost:4100';

export const apiEnvSchema = z.object({
  PORT: z.coerce.number().int(),
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:3100,http://localhost:3200')
    .transform((s) => s.split(',').map((o) => o.trim())),
});

export const webEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url().default(defaultApiUrl),
});

export const adminEnvSchema = z.object({
  VITE_API_URL: z.url().default(defaultApiUrl),
});

/**
 * 환경변수를 검증한다. 읽을 곳(source)은 앱이 넘긴다:
 * api/web은 process.env, admin(브라우저)은 import.meta.env.
 */
export function parseEnv<T extends z.ZodType>(
  schema: T,
  source: Record<string, unknown>,
): z.infer<T> {
  const result = schema.safeParse(source);
  if (!result.success) {
    throw new Error(`환경변수가 올바르지 않습니다:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}
