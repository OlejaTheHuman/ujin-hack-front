export interface RegisterRequestI {
  email: string;
  password: string; //todo обговорить требования для пароля и логина
  username: string;
}

export interface RegisterResponseI {
  message: string;
}

export interface LoginRequestI {
  email: string;
  password: string;
}

export interface CreateUserSessionResponseI {
  accessToken: string;
  refreshToken: string;
}

export interface RenewUserTokensRequestI {
  refreshToken: string;
}

export interface RenewUserTokensResponseI extends CreateUserSessionResponseI {}

export interface UserI {
  username?: string;
}