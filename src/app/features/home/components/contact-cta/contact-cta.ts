import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationItemComponent } from '../../../../shared/ui/navigation-item/navigation-item';

@Component({
  selector: 'app-contact-cta',
  imports: [NavigationItemComponent],
  templateUrl: './contact-cta.html',
  styleUrl: './contact-cta.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCtaComponent {}
