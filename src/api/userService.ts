import {AxiosResponse} from 'axios';
import $api from './index.ts';

export interface GetUsernameResponseI {
  userName: string;
}

export default class UserService {
  private static readonly loginBaseUrl = '/Get';

  static async getUsername(): Promise<AxiosResponse<GetUsernameResponseI>> {
    return $api.post<GetUsernameResponseI>(`${this.loginBaseUrl}/username-from-token`);
  }
}
