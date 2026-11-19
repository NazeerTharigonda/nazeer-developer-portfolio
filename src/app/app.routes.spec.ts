import { environment } from '../environments/environment';
import { routes } from './app.routes';

describe('application routes', () => {
  it('keeps the design showcase out of production route configuration', () => {
    expect(routes.some((route) => route.path === '_design-system')).toBe(!environment.production);
  });

  it('keeps the development admin preview separate from the public shell', () => {
    const designSystemRoute = routes.find((route) => route.path === '_design-system');
    const adminPreview = designSystemRoute?.children?.find((route) => route.path === 'admin');

    expect(adminPreview?.component).toBeUndefined();
    expect(adminPreview?.loadComponent).toBeDefined();
  });

  it('keeps public feature routes nested under the public shell', () => {
    const publicShell = routes.find((route) => route.path === '');

    expect(publicShell?.children?.map((route) => route.path)).toEqual([
      '',
      'about',
      'experience',
      'skills',
      'projects',
      'certifications',
      'education',
      'blog',
      'contact',
      'github-stats',
      'leetcode-stats',
    ]);
  });
});
