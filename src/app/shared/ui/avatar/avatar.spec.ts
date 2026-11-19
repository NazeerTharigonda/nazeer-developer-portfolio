import { TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar';

describe('AvatarComponent', () => {
  it('uses initials and an accessible name when no image is supplied', async () => {
    await TestBed.configureTestingModule({ imports: [AvatarComponent] }).compileComponents();
    const fixture = TestBed.createComponent(AvatarComponent);
    fixture.componentRef.setInput('label', 'Ada Lovelace');
    fixture.detectChanges();

    const avatar: HTMLElement = fixture.nativeElement.querySelector('[role="img"]');
    expect(avatar.getAttribute('aria-label')).toBe('Ada Lovelace');
    expect(avatar.textContent?.trim()).toBe('AL');
  });

  it('falls back to initials when the image fails to load', async () => {
    await TestBed.configureTestingModule({ imports: [AvatarComponent] }).compileComponents();
    const fixture = TestBed.createComponent(AvatarComponent);
    fixture.componentRef.setInput('label', 'Ada Lovelace');
    fixture.componentRef.setInput('src', '/avatar.png');
    fixture.detectChanges();

    const image: HTMLImageElement = fixture.nativeElement.querySelector('img');
    image.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('img')).toBeNull();
    expect(fixture.nativeElement.textContent.trim()).toBe('AL');
  });
});
