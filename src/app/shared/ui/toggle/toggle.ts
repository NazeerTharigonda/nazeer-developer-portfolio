import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ui-toggle',
  template: `
    <button
      class="toggle"
      type="button"
      role="switch"
      [disabled]="disabled()"
      [attr.aria-label]="label()"
      [attr.aria-checked]="checked()"
      (click)="toggle()"
      (blur)="markTouched()"
    >
      <span class="toggle__thumb"></span>
    </button>
  `,
  styles: `
    .toggle {
      display: inline-flex;
      width: 2.75rem;
      height: 1.625rem;
      align-items: center;
      padding: 0.1875rem;
      background: var(--color-border-strong);
      border: 0;
      border-radius: var(--radius-full);
      transition: background-color var(--duration-fast) var(--ease-standard);
    }

    .toggle[aria-checked='true'] {
      background: var(--color-brand-primary);
    }

    .toggle:disabled {
      opacity: 0.5;
    }

    .toggle__thumb {
      width: 1.25rem;
      height: 1.25rem;
      background: var(--color-neutral-0);
      border-radius: 50%;
      box-shadow: var(--shadow-subtle);
      transition: transform var(--duration-fast) var(--ease-standard);
    }

    .toggle[aria-checked='true'] .toggle__thumb {
      transform: translateX(1.125rem);
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent implements ControlValueAccessor {
  readonly label = input.required<string>();
  protected readonly checked = signal(false);
  protected readonly disabled = signal(false);

  private onChange: (value: boolean) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: unknown): void {
    this.checked.set(value === true);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected toggle(): void {
    if (this.disabled()) {
      return;
    }

    const nextValue = !this.checked();
    this.checked.set(nextValue);
    this.onChange(nextValue);
  }

  protected markTouched(): void {
    this.onTouched();
  }
}
