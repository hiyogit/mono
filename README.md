# mono

pnpm workspaces + Turborepo 모노레포 실습.

| 앱           | 스택                          | 포트 |
| ------------ | ----------------------------- | ---- |
| `apps/api`   | NestJS + nestjs-zod           | 4100 |
| `apps/web`   | Next.js (사용자 목록)         | 3100 |
| `apps/admin` | Vite + React (목록 + 생성 폼) | 3200 |

포트는 각 앱의 `package.json` 스크립트에서 지정한다 (`PORT=4100`, `-p 3100`, `--port 3200`).

## 공유 패키지

| 패키지                | 내용                                                              |
| --------------------- | ----------------------------------------------------------------- |
| `@mono/consts`        | 포트, 라우트, 역할, 에러 메시지                                   |
| `@mono/types`         | `User` 등 도메인/응답 타입                                        |
| `@mono/schemas`       | zod 입력 스키마 (admin 폼 + api 검증)                             |
| `@mono/api-client`    | web/admin 공용 fetch 클라이언트                                   |
| `@mono/utils`         | `formatDate`, `maskEmail`                                         |
| `@mono/ui`            | `Button`, `Card` (`'use client'`) / `@mono/ui/tokens` 디자인 토큰 |
| `@mono/env`           | 환경변수 zod 검증 (`parseEnv(schema, source)`)                    |
| `@mono/tsconfig`      | 공통 tsconfig                                                     |
| `@mono/eslint-config` | 공통 ESLint flat config                                           |

공유 패키지는 tsup으로 ESM + CJS를 빌드하고, Turborepo가 `^build`로 의존 순서를 맞춘다.

## 명령어

```bash
pnpm install
pnpm dev     # 패키지 빌드 후 api/web/admin + 패키지 watch 동시 실행
pnpm build
pnpm lint
pnpm format
```
