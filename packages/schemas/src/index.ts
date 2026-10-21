import { z } from 'zod';
import { ERROR_MESSAGE, USER_NAME_LENGTH, USER_ROLES } from '@mono/consts';

/** 사용자 생성 입력 검증. admin 폼과 api가 똑같은 규칙/메시지를 쓴다. */
export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(USER_NAME_LENGTH.MIN, ERROR_MESSAGE.NAME_TOO_SHORT)
    .max(USER_NAME_LENGTH.MAX, ERROR_MESSAGE.NAME_TOO_LONG),
  email: z.email(ERROR_MESSAGE.INVALID_EMAIL),
  role: z.enum(USER_ROLES, ERROR_MESSAGE.INVALID_ROLE),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
