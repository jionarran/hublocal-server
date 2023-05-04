export interface UserPayload {
  clientId: number;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
