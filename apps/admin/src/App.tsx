import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { z } from 'zod';
import { ApiError, createApiClient } from '@mono/api-client';
import { APP_NAME, USER_ROLE, USER_ROLES, USER_ROLE_LABEL } from '@mono/consts';
import { adminEnvSchema, parseEnv } from '@mono/env';
import { createUserSchema, type CreateUserInput } from '@mono/schemas';
import type { User } from '@mono/types';
import { Button, Card } from '@mono/ui';
import { tokens } from '@mono/ui/tokens';
import { formatDate } from '@mono/utils';

const env = parseEnv(adminEnvSchema, import.meta.env);
const api = createApiClient(env.VITE_API_URL);

type FieldErrors = Partial<Record<keyof CreateUserInput, string>>;

const inputStyle = {
  padding: tokens.space(2),
  border: `1px solid ${tokens.color.border}`,
  borderRadius: tokens.radius,
};

export function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<CreateUserInput>({
    name: '',
    email: '',
    role: USER_ROLE.MEMBER,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  // 체크하면 프론트 검증을 건너뛰고 서버 검증 결과를 그대로 본다
  const [skipClientValidation, setSkipClientValidation] = useState(false);

  const load = useCallback(() => {
    api
      .getUsers()
      .then(setUsers)
      .catch(() => setServerMessage('API에 연결할 수 없습니다.'));
  }, []);
  useEffect(load, [load]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerMessage(null);

    if (!skipClientValidation) {
      const result = createUserSchema.safeParse(form);
      if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        setErrors({
          name: fieldErrors.name?.[0],
          email: fieldErrors.email?.[0],
          role: fieldErrors.role?.[0],
        });
        setServerMessage('[프론트 검증] 입력값을 확인하세요.');
        return;
      }
    }

    try {
      await api.createUser(form);
      setForm({ name: '', email: '', role: USER_ROLE.MEMBER });
      load();
    } catch (err) {
      if (!(err instanceof ApiError)) throw err;
      setErrors(Object.fromEntries(err.fieldErrors.map((f) => [f.path, f.message])));
      setServerMessage(`[서버 응답 ${err.status}] ${err.message}`);
    }
  }

  return (
    <main style={{ display: 'grid', gap: tokens.space(4) }}>
      <h1>{APP_NAME} · 관리자</h1>

      <Card title="사용자 생성">
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: tokens.space(2) }}>
          <input
            style={inputStyle}
            placeholder="이름"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <small style={{ color: tokens.color.danger }}>{errors.name}</small>}
          <input
            style={inputStyle}
            placeholder="이메일"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <small style={{ color: tokens.color.danger }}>{errors.email}</small>}
          <select
            style={inputStyle}
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as CreateUserInput['role'] })}
          >
            {USER_ROLES.map((role) => (
              <option key={role} value={role}>
                {USER_ROLE_LABEL[role]}
              </option>
            ))}
          </select>
          <label style={{ color: tokens.color.muted }}>
            <input
              type="checkbox"
              checked={skipClientValidation}
              onChange={(e) => setSkipClientValidation(e.target.checked)}
            />{' '}
            프론트 검증 건너뛰기 (서버 검증 확인용)
          </label>
          <Button type="submit">생성</Button>
          {serverMessage && <small style={{ color: tokens.color.danger }}>{serverMessage}</small>}
        </form>
      </Card>

      {users.map((u) => (
        <Card key={u.id} title={`${u.name} (${USER_ROLE_LABEL[u.role]})`}>
          <div style={{ color: tokens.color.muted }}>
            {u.email} · {formatDate(u.createdAt)}
          </div>
        </Card>
      ))}
    </main>
  );
}
