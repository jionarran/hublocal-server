export interface UserPayload {
  clientId?: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
