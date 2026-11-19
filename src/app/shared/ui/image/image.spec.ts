import { TestBed } from '@angular/core/testing';
import { ImageComponent } from './image';

describe('ImageComponent', () => {
  it('renders an accessible responsive image with the supplied loading strategy', async () => {
    await TestBed.configureTestingModule({ imports: [ImageComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ImageComponent);
    fixture.componentRef.setInput('src', '/portfolio-image.webp');
    fixture.componentRef.setInput('alt', 'Project interface');
    fixture.componentRef.setInput('loading', 'eager');
    fixture.componentRef.setInput('aspectRatio', 'landscape');
    fixture.detectChanges();

    const image: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(image.getAttribute('src')).toBe('/portfolio-image.webp');
    expect(image.alt).toBe('Project interface');
    expect(image.getAttribute('loading')).toBe('eager');
    expect(fixture.nativeElement.querySelector('.image-frame--landscape')).not.toBeNull();
  });
});
