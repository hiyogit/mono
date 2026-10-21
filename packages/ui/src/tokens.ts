/** 디자인 토큰: web, admin이 같은 색/간격을 쓴다 */
export const tokens = {
  color: {
    primary: '#4f46e5',
    primaryText: '#ffffff',
    text: '#111827',
    muted: '#6b7280',
    border: '#e5e7eb',
    danger: '#dc2626',
    surface: '#ffffff',
  },
  radius: 8,
  space: (n: number) => n * 4,
} as const;
