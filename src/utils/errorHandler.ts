import NotificationStore, { NotificationServiceI } from '../store/notificationStore.ts';
import { isAxiosError } from 'axios';

export interface ErrorI {
  code?: number;
  errorText: string;
  type?: 'error' | 'warning' | 'notification';
  callback?: () => void;
}

class ErrorHandler {
  defaultErrors: ErrorI[] = [];
  private readonly _unexpectedErrorText = 'Неизвестная ошибка';
  private readonly _notificationService: NotificationServiceI = NotificationStore;

  handleRequestError(error: any, errorsConfig?: ErrorI[]): void {
    let handled = false;

    if (isAxiosError(error)) {
      [
        ...(errorsConfig ?? []),
        ...this.defaultErrors.filter(
          (defaultError) => !errorsConfig?.some((err) => defaultError.code === err.code),
        ),
      ].forEach((errorConfig) => {
        if (errorConfig.code === error?.response?.status) {
          this._notificationService.show(errorConfig.errorText, errorConfig.type);
          errorConfig.callback?.();
          console.error(errorConfig.errorText);
          handled = true;
        }
      });
    }

    if (!handled) {
      this._notificationService.show(this._unexpectedErrorText, 'error');
      console.error(error);
    }
  }

  handleError(message: string, type?: ErrorI['type']) {
    this._notificationService.show(message, type);
    console.error(message);
  }
}

export default new ErrorHandler();
