import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.removeItem('portfolio-theme-preference');
    TestBed.configureTestingModule({ providers: [ThemeService] });
  });

  afterEach(() => {
    localStorage.removeItem('portfolio-theme-preference');
    delete document.documentElement.dataset['theme'];
  });

  it('uses the system preference when no explicit preference is stored', () => {
    const service = TestBed.inject(ThemeService);

    expect(service.preference()).toBe('system');
    expect(['light', 'dark']).toContain(service.activeTheme());
  });

  it('persists and applies an explicit theme preference', () => {
    const service = TestBed.inject(ThemeService);

    service.setPreference('light');
    TestBed.tick();

    expect(service.preference()).toBe('light');
    expect(localStorage.getItem('portfolio-theme-preference')).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
  });

  it('toggles between resolved light and dark themes', () => {
    const service = TestBed.inject(ThemeService);
    service.setPreference('dark');
    service.toggle();

    expect(service.preference()).toBe('light');
  });
});
