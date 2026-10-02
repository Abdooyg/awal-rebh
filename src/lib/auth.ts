export type SocialProvider = 'google' | 'apple' | 'facebook';

export interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

async function post<T>(path: string, body: unknown): Promise<T> {
  if (!API_BASE_URL) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return {} as T;
  }
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const message = await res.text().catch(() => '');
    throw new Error(message || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function login(payload: LoginPayload) {
  return post('/auth/login', payload);
}

export function signup(payload: SignupPayload) {
  return post('/auth/signup', payload);
}

export async function socialSignIn(provider: SocialProvider) {
  if (API_BASE_URL) {
    window.location.href = `${API_BASE_URL}/auth/oauth/${provider}`;
    return;
  }
  await new Promise((resolve) => setTimeout(resolve, 900));
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
