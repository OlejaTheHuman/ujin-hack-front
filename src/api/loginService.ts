import {
  RegisterRequestI,
  RegisterResponseI,
  LoginRequestI,
  RenewUserTokensRequestI,
  RenewUserTokensResponseI, CreateUserSessionResponseI,
} from '../types/user.types.ts';
import { AxiosResponse } from 'axios';
import $api from './index.ts';

export default class LoginService {
  private static readonly loginBaseUrl = '/Auth';

  static async registration(data: RegisterRequestI): Promise<AxiosResponse<RegisterResponseI>> {
    return $api.post<RegisterResponseI>(`${this.loginBaseUrl}/register`, data);
  }

  static async login(
    data: LoginRequestI,
  ): Promise<AxiosResponse<CreateUserSessionResponseI>> {
    return $api.post<CreateUserSessionResponseI>(`${this.loginBaseUrl}/token`, data);
  }

  static async logout(currentToken?: string): Promise<AxiosResponse> {
    return $api.post<CreateUserSessionResponseI>(`${this.loginBaseUrl}/invalidate-token`, {currentToken});
  }

  static async verifyRegistration(data: string): Promise<AxiosResponse<void>> {
    return $api.post(`${this.loginBaseUrl}/verify-email`, { login: data });
  }

  static async verifyResetPassword(data: string): Promise<AxiosResponse<void>> {
    return $api.post(`${this.loginBaseUrl}/reset-password`, { login: data });
  }

  static async renewTokens(
    data: RenewUserTokensRequestI,
  ): Promise<AxiosResponse<RenewUserTokensResponseI>> {
    return $api.post(`${this.loginBaseUrl}/refresh-token`, data);
  }
}
