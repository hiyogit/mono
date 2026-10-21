import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGE, USER_ROLE } from '@mono/consts';
import type { CreateUserInput } from '@mono/schemas';
import type { User } from '@mono/types';

@Injectable()
export class UsersService {
  // DB 대신 메모리에 저장 (서버 재시작 시 초기화)
  private users: User[] = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      role: USER_ROLE.ADMIN,
      createdAt: new Date().toISOString(),
    },
  ];
  private nextId = 2;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND);
    return user;
  }

  create(input: CreateUserInput): User {
    if (this.users.some((u) => u.email === input.email)) {
      throw new ConflictException(ERROR_MESSAGE.EMAIL_DUPLICATED);
    }
    const user: User = { id: this.nextId++, ...input, createdAt: new Date().toISOString() };
    this.users.push(user);
    return user;
  }
}
