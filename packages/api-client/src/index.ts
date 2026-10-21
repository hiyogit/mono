import { API_ROUTES } from '@mono/consts';
import type { CreateUserInput } from '@mono/schemas';
import type { ApiErrorResponse, FieldError, User } from '@mono/types';

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly fieldErrors: FieldError[] = [],
  ) {
    super(message);
  }
}

/** web, admin이 함께 쓰는 타입 안전한 API 클라이언트 */
export function createApiClient(baseUrl: string) {
  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
      cache: 'no-store',
    });
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as ApiErrorResponse | null;
      const fieldErrors = (body?.errors ?? []).map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      }));
      throw new ApiError(res.status, body?.message ?? res.statusText, fieldErrors);
    }
    return res.json() as Promise<T>;
  }

  return {
    getUsers: () => request<User[]>(API_ROUTES.USERS),
    getUser: (id: number) => request<User>(`${API_ROUTES.USERS}/${id}`),
    createUser: (input: CreateUserInput) =>
      request<User>(API_ROUTES.USERS, { method: 'POST', body: JSON.stringify(input) }),
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
