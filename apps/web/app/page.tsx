import { createApiClient } from '@mono/api-client';
import { APP_NAME, USER_ROLE_LABEL } from '@mono/consts';
import { parseEnv, webEnvSchema } from '@mono/env';
import type { User } from '@mono/types';
import { Button, Card } from '@mono/ui';
import { tokens } from '@mono/ui/tokens';
import { formatDate, maskEmail } from '@mono/utils';

export const dynamic = 'force-dynamic';

const env = parseEnv(webEnvSchema, process.env);
const api = createApiClient(env.NEXT_PUBLIC_API_URL);

export default async function Home() {
  let users: User[] = [];
  let error: string | null = null;
  try {
    users = await api.getUsers();
  } catch {
    error = `API(${env.NEXT_PUBLIC_API_URL})에 연결할 수 없습니다.`;
  }

  return (
    <main style={{ display: 'grid', gap: tokens.space(3) }}>
      <h1>{APP_NAME} · 사용자 목록</h1>
      <form>
        <Button type="submit">새로고침</Button>
      </form>
      {error && <p style={{ color: tokens.color.danger }}>{error}</p>}
      {users.map((u) => (
        <Card key={u.id} title={u.name}>
          <div style={{ color: tokens.color.muted }}>
            {maskEmail(u.email)} · {USER_ROLE_LABEL[u.role]} · {formatDate(u.createdAt)}
          </div>
        </Card>
      ))}
    </main>
  );
}
