import { DOCUMENT } from '@angular/common';
import { computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';

export type ThemePreference = 'system' | 'light' | 'dark';
export type ResolvedTheme = Exclude<ThemePreference, 'system'>;

const THEME_STORAGE_KEY = 'portfolio-theme-preference';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly window = this.document.defaultView;
  private readonly mediaQuery = this.window?.matchMedia?.('(prefers-color-scheme: dark)');
  private readonly systemPrefersDark = signal(this.mediaQuery?.matches ?? false);

  readonly preference = signal<ThemePreference>(this.readPreference());
  readonly activeTheme = computed<ResolvedTheme>(() => {
    const preference = this.preference();
    return preference === 'system' ? (this.systemPrefersDark() ? 'dark' : 'light') : preference;
  });

  constructor() {
    effect(() => {
      this.document.documentElement.dataset['theme'] = this.activeTheme();
    });

    this.mediaQuery?.addEventListener('change', this.onSystemThemeChange);
    this.destroyRef.onDestroy(() =>
      this.mediaQuery?.removeEventListener('change', this.onSystemThemeChange),
    );
  }

  setPreference(preference: ThemePreference): void {
    this.preference.set(preference);
    this.window?.localStorage.setItem(THEME_STORAGE_KEY, preference);
  }

  toggle(): void {
    this.setPreference(this.activeTheme() === 'dark' ? 'light' : 'dark');
  }

  private readonly onSystemThemeChange = (event: MediaQueryListEvent): void => {
    this.systemPrefersDark.set(event.matches);
  };

  private readPreference(): ThemePreference {
    const storedPreference = this.window?.localStorage.getItem(THEME_STORAGE_KEY);
    return storedPreference === 'light' || storedPreference === 'dark'
      ? storedPreference
      : 'system';
  }
}
