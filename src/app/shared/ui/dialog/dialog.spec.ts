import { TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog';

describe('DialogComponent', () => {
  it('associates the native dialog with its visible title', async () => {
    await TestBed.configureTestingModule({ imports: [DialogComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DialogComponent);
    fixture.componentRef.setInput('id', 'test-dialog');
    fixture.componentRef.setInput('title', 'Dialog title');
    fixture.detectChanges();

    const dialog: HTMLDialogElement = fixture.nativeElement.querySelector('dialog');
    const title = fixture.nativeElement.querySelector('#test-dialog-title');

    expect(dialog.getAttribute('aria-labelledby')).toBe('test-dialog-title');
    expect(title.textContent).toContain('Dialog title');
    expect(dialog.open).toBe(false);

    let openChange = true;
    fixture.componentInstance.openChange.subscribe((open) => (openChange = open));
    dialog.dispatchEvent(new Event('close'));

    expect(openChange).toBe(false);
  });
});
