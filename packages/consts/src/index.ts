// 프론트(web, admin)와 백엔드(api)가 함께 쓰는 상수

export const APP_NAME = 'Mono Practice';

/** 포트는 이곳에서만 정의한다. 세 앱이 모두 이 값을 읽는다. */
export const PORT = {
  API: 4100,
  WEB: 3100,
  ADMIN: 3200,
} as const;

export const API_ROUTES = {
  USERS: '/users',
} as const;

export const USER_ROLE = {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
} as const;
export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
export const USER_ROLES = Object.values(USER_ROLE) as [UserRole, ...UserRole[]];

export const USER_ROLE_LABEL: Record<UserRole, string> = {
  ADMIN: '관리자',
  MEMBER: '일반회원',
};

export const USER_NAME_LENGTH = { MIN: 2, MAX: 20 } as const;

export const ERROR_MESSAGE = {
  USER_NOT_FOUND: '사용자를 찾을 수 없습니다.',
  EMAIL_DUPLICATED: '이미 등록된 이메일입니다.',
  NAME_TOO_SHORT: `이름은 ${USER_NAME_LENGTH.MIN}자 이상이어야 합니다.`,
  NAME_TOO_LONG: `이름은 ${USER_NAME_LENGTH.MAX}자 이하여야 합니다.`,
  INVALID_EMAIL: '올바른 이메일 형식이 아닙니다.',
  INVALID_ROLE: '역할은 ADMIN 또는 MEMBER 중 하나여야 합니다.',
} as const;
