import type { UserRole } from '@mono/consts';

/** API가 돌려주는 사용자 (도메인/응답 타입) */
export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  /** ISO 8601 문자열 */
  createdAt: string;
}

export interface FieldError {
  path: string;
  message: string;
}

/** API 에러 응답 형태 (Nest 기본 에러 + nestjs-zod 검증 에러) */
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors?: { path: (string | number)[]; message: string }[];
}
