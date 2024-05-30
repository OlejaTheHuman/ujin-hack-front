import { makeAutoObservable } from 'mobx';
import { Colors, THEME } from '../consts.ts';

class ConfigStore {
  private _theme: 'dark' | 'light' = 'dark';

  constructor() {
    makeAutoObservable(this);
  }

  get theme() {
    return this._theme;
  }

  changeTheme(theme: typeof this._theme){
        const doc = document.documentElement;
        doc.style.setProperty('--bg-color', theme === 'dark' ? Colors.DarkBg : Colors.LightBg);
        this._theme = theme;
        localStorage.setItem(THEME, theme);
  }

  loadTheme() {
    const savedTheme = localStorage.getItem(THEME);
    this._theme =  savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'dark';
    const doc = document.documentElement;
    doc.style.setProperty('--bg-color', this._theme === 'dark' ? Colors.DarkBg : Colors.LightBg);
  }
}

export default new ConfigStore();
