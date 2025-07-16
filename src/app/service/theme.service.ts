import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeKey = 'theme';

  constructor() {
    this.applyTheme();
  }

  toggleTheme() {
    const current = localStorage.getItem(this.themeKey);

    if (current === 'dark') {
      this.setTheme('light');
    } else if (current === 'light') {
      this.setTheme('system'); // theo OS
    } else {
      this.setTheme('dark');
    }
  }

  private setTheme(theme: 'light' | 'dark' | 'system') {
    if (theme === 'system') {
      localStorage.removeItem(this.themeKey);
    } else {
      localStorage.setItem(this.themeKey, theme);
    }
    this.applyTheme();
  }

  applyTheme() {
    const theme = localStorage.getItem(this.themeKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme === 'dark' || (!theme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
}
