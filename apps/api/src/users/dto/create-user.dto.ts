import { createZodDto } from 'nestjs-zod';
import { createUserSchema } from '@mono/schemas';

// 규칙은 공유 패키지(@mono/schemas)에 있고, Nest에서는 DTO 클래스 모양으로 쓴다
export class CreateUserDto extends createZodDto(createUserSchema) {}
