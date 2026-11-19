import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[uiTooltip]',
  standalone: true,
})
export class TooltipDirective {
  readonly uiTooltip = input.required<string>();

  @HostBinding('attr.title')
  protected get nativeTitle(): string {
    return this.uiTooltip();
  }

  @HostBinding('attr.data-ui-tooltip')
  protected get tooltipText(): string {
    return this.uiTooltip();
  }

  @HostBinding('attr.aria-description')
  protected get accessibleDescription(): string {
    return this.uiTooltip();
  }
}
