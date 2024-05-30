import {makeAutoObservable} from 'mobx';
import {ErrorI} from '../utils/errorHandler.ts';

export interface MessageI {
  id: number;
  timeoutId: ReturnType<typeof setTimeout>;
  message: string;
  type?: 'error' | 'warning' | 'notification';
  onClose: () => void;
}

export interface NotificationServiceI {
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showNotification: (message: string) => void;
  show: (message: string, type: ErrorI['type']) => void;
}

class NotificationStore implements NotificationServiceI {
  private _messagesQueue: MessageI[] = [];
  private readonly _timeout = 5000;

  constructor() {
    makeAutoObservable(this);
  }

  get messages(): MessageI[] {
    return this._messagesQueue;
  }

  showError(message: string): void {
    this.showMessage(message, 'error');
  }

  showWarning(message: string): void {
    this.showMessage(message, 'warning');
  }

  showNotification(message: string): void {
    this.showMessage(message, 'notification');
  }

  show(message: string, type: MessageI['type']): void {
    this.showMessage(message, type);
  }

  private showMessage(message: string, type: MessageI['type']): void {
    const id = Date.now();
    const removeMessageHandler = () => this.removeMessageFromQueue(id);
    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(
      removeMessageHandler,
      this._timeout,
    );
    this.pushMessageQueue({message, type, id, onClose: removeMessageHandler, timeoutId});
  }

  private pushMessageQueue(message: MessageI): void {
    this._messagesQueue.push(message);
  }

  private removeMessageFromQueue(id: MessageI['id']): void {
    const indexOfMessage = this._messagesQueue.map((message) => message.id).indexOf(id);
    const message = this._messagesQueue.splice(indexOfMessage, 1)[0];
    clearTimeout(message.timeoutId);
  }
}

export default new NotificationStore();
