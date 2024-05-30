import {makeAutoObservable} from 'mobx';
import {
  CreateUserSessionResponseI,
  LoginRequestI,
  RegisterRequestI,
  RegisterResponseI,
  RenewUserTokensResponseI
} from '../types/user.types.ts';
import LoginService from '../api/loginService.ts';
import {REFRESH_TOKEN, TOKEN} from '../consts.ts';
import {router} from '../main.tsx';
import ErrorHandler, {ErrorI} from '../utils/errorHandler.ts';
import Cookies from "js-cookie";
import {AxiosResponse} from "axios";
import {sha256} from "js-sha256";
import UserService, {GetUsernameResponseI} from "../api/userService.ts";

class UserStore {
  isAuth = false;
  _user: GetUsernameResponseI = {
    userName: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  get user(): GetUsernameResponseI {
    return this._user;
  }

  async loadUserData(): Promise<AxiosResponse<GetUsernameResponseI>> {
    try {
      const response = await UserService.getUsername();
      this._user = response.data;
      return response;
    } catch (e) {
      ErrorHandler.handleError('Ошибка загрузки данных');
    }
    throw new Error();
  }

  async login(data: LoginRequestI): Promise<AxiosResponse<CreateUserSessionResponseI>> {
    try {
      const response = await LoginService.login({email: data.email, password: sha256(data.password)});
      Cookies.set(TOKEN, response.data.token);
      Cookies.set(REFRESH_TOKEN, response.data.refreshToken);
      this.setAuth(true);
      return response;
    } catch (e: unknown) {
      const errorsConfig: ErrorI[] = [{errorText: 'Неверный логин или пароль', code: 401}];
      ErrorHandler.handleRequestError(e, errorsConfig);
    }
    throw new Error();
  }

  async registration(data: RegisterRequestI): Promise<AxiosResponse<RegisterResponseI>> {
    try {
      return await LoginService.registration({
        email: data.email,
        password: sha256(data.password),
        username: data.username
      });
    } catch (e) {
      ErrorHandler.handleError('Ошибка регистрации');
    }
    throw new Error();
  }

  async retryResetPassword(code: string): Promise<AxiosResponse> {
    try {
      return await LoginService.verifyResetPassword(code);
    } catch (e) {
      const errorsConfig: ErrorI[] = [{errorText: 'Неверный логин', code: 422}];
      ErrorHandler.handleRequestError(e, errorsConfig);
    }
    throw new Error();
  }

  async verifyEmail(code: string): Promise<AxiosResponse> {
    try {
      return await LoginService.verifyRegistration(code);
    } catch (e) {
      const errorsConfig: ErrorI[] = [{errorText: 'Такой почты не существует', code: 400}];
      ErrorHandler.handleRequestError(e, errorsConfig);
    }
    throw new Error();
  }

  async logout(): Promise<AxiosResponse> {
    try {
      const response = await LoginService.logout(Cookies.get(TOKEN));
      Cookies.remove(TOKEN);
      Cookies.remove(REFRESH_TOKEN);
      this.setAuth(false);
      return response;
    } catch (e) {
      ErrorHandler.handleRequestError(e);
    }
    throw new Error();
  }

  async renew(): Promise<AxiosResponse<RenewUserTokensResponseI>> {
    try {
      const refreshToken = Cookies.get(REFRESH_TOKEN);
      if (!refreshToken) throw new Error('refreshToken');
      const response = await LoginService.renewTokens({refreshToken: refreshToken});
      this.setAuth(true);
      Cookies.set(TOKEN, response.data.token);
      Cookies.set(REFRESH_TOKEN, response.data.refreshToken);
      return response;
    } catch (e) {
      this.setAuth(false);
      const errorsConfig: ErrorI[] = [
        {errorText: 'Ошибка авторизации', code: 401},
      ];
      ErrorHandler.handleRequestError(e, errorsConfig);
      await router.navigate('/login');
    }
    throw new Error();
  }
}

export default new UserStore();
