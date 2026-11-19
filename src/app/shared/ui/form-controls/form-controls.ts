import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'input[uiInput], textarea[uiInput], select[uiInput]',
  standalone: true,
})
export class InputDirective {
  @HostBinding('class.ui-input') protected readonly inputClass = true;
}

@Directive({
  selector: 'input[type=checkbox][uiCheckbox]',
  standalone: true,
})
export class CheckboxDirective {
  @HostBinding('class.ui-checkbox') protected readonly checkboxClass = true;
}

@Directive({
  selector: 'input[type=radio][uiRadio]',
  standalone: true,
})
export class RadioDirective {
  @HostBinding('class.ui-radio') protected readonly radioClass = true;
}
