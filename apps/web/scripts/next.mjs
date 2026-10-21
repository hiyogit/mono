// Next는 설정 파일로 포트를 정할 수 없어서, 공유 상수의 포트를 CLI 인자로 넘겨 실행한다
import { spawn } from 'node:child_process';
import { PORT } from '@mono/consts';

const command = process.argv[2] ?? 'dev';
const child = spawn('next', [command, '-p', String(PORT.WEB)], { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code ?? 0));
