import { TestBed } from '@angular/core/testing';
import { CardComponent } from './card';

describe('CardComponent', () => {
  it('supports keyboard activation for the interactive variant', async () => {
    await TestBed.configureTestingModule({ imports: [CardComponent] }).compileComponents();
    const fixture = TestBed.createComponent(CardComponent);
    fixture.componentRef.setInput('variant', 'interactive');
    let activationCount = 0;
    fixture.componentInstance.activated.subscribe(() => activationCount++);
    fixture.detectChanges();

    const card: HTMLElement = fixture.nativeElement.querySelector('[role="button"]');
    card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    card.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

    expect(activationCount).toBe(2);
  });
});
