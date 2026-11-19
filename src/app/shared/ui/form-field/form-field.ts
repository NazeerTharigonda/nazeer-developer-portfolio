import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-form-field',
  template: `
    <div class="form-field">
      @if (label()) {
        <label class="form-field__label" [for]="controlId()">
          {{ label() }}
          @if (required()) {
            <span aria-hidden="true" class="form-field__required">*</span>
          }
        </label>
      }
      <ng-content />
      @if (error()) {
        <p class="form-field__message form-field__message--error" [id]="messageId()" role="alert">
          {{ error() }}
        </p>
      } @else if (success()) {
        <p class="form-field__message form-field__message--success" [id]="messageId()">
          {{ success() }}
        </p>
      } @else if (hint()) {
        <p class="form-field__message" [id]="messageId()">{{ hint() }}</p>
      }
    </div>
  `,
  styles: `
    .form-field {
      display: grid;
      min-width: 0;
      gap: var(--space-2);
    }

    .form-field__label {
      color: var(--color-text-primary);
      font-size: var(--font-size-label);
      font-weight: var(--font-weight-medium);
    }

    .form-field__required,
    .form-field__message--error {
      color: var(--color-error);
    }

    .form-field__message--success {
      color: var(--color-success);
    }

    .form-field__message {
      margin: 0;
      color: var(--color-text-muted);
      font-size: var(--font-size-body-small);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  readonly controlId = input.required<string>();
  readonly label = input('');
  readonly hint = input('');
  readonly error = input('');
  readonly success = input('');
  readonly required = input(false);

  protected messageId(): string {
    return `${this.controlId()}-message`;
  }
}
