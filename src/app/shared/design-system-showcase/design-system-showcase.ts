import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AlertComponent } from '../ui/alert/alert';
import { BadgeComponent } from '../ui/badge/badge';
import { BreadcrumbComponent } from '../ui/breadcrumb/breadcrumb';
import { ButtonComponent } from '../ui/button/button';
import { CardComponent } from '../ui/card/card';
import {
  DataTableComponent,
  type DataTableAction,
  type DataTableColumn,
  type DataTableRowKey,
} from '../ui/data-table/data-table';
import { DialogComponent } from '../ui/dialog/dialog';
import { DividerComponent } from '../ui/divider/divider';
import { DropdownComponent } from '../ui/dropdown/dropdown';
import { EmptyStateComponent } from '../ui/empty-state/empty-state';
import { FilterChipComponent } from '../ui/filter-chip/filter-chip';
import { FormFieldComponent } from '../ui/form-field/form-field';
import {
  CheckboxDirective,
  InputDirective,
  RadioDirective,
} from '../ui/form-controls/form-controls';
import { IconButtonComponent } from '../ui/icon-button/icon-button';
import { MenuItemComponent } from '../ui/menu-item/menu-item';
import { MobileNavTriggerComponent } from '../ui/mobile-nav-trigger/mobile-nav-trigger';
import { NavigationItemComponent } from '../ui/navigation-item/navigation-item';
import { PaginationComponent } from '../ui/pagination/pagination';
import { ProgressComponent } from '../ui/progress/progress';
import { SectionHeadingComponent } from '../ui/section-heading/section-heading';
import {
  SegmentedControlComponent,
  type SegmentOption,
} from '../ui/segmented-control/segmented-control';
import { SkeletonComponent } from '../ui/skeleton/skeleton';
import { SpinnerComponent } from '../ui/spinner/spinner';
import { TabsComponent, type TabItem } from '../ui/tabs/tabs';
import { ThemeToggleComponent } from '../ui/theme-toggle/theme-toggle';
import { ToggleComponent } from '../ui/toggle/toggle';
import { ToastService } from '../../core/notifications/toast.service';
import { TooltipDirective } from '../ui/tooltip/tooltip';
import { AvatarComponent } from '../ui/avatar/avatar';

interface ShowcaseRow {
  readonly id: string;
  readonly name: string;
  readonly status: string;
}

const SHOWCASE_ROWS: readonly ShowcaseRow[] = [
  { id: 'alpha', name: 'Alpha', status: 'Ready' },
  { id: 'beta', name: 'Beta', status: 'In progress' },
  { id: 'gamma', name: 'Gamma', status: 'Archived' },
];

const SHOWCASE_COLUMNS: readonly DataTableColumn<ShowcaseRow>[] = [
  { key: 'name', label: 'Name', value: (row) => row.name, sortable: true },
  { key: 'status', label: 'Status', value: (row) => row.status, sortable: true },
];

const SHOWCASE_ACTIONS: readonly DataTableAction[] = [{ id: 'inspect', label: 'Inspect' }];

const SHOWCASE_SEGMENTS: readonly SegmentOption[] = [
  { id: 'all', label: 'All' },
  { id: 'current', label: 'Current' },
  { id: 'archived', label: 'Archived' },
];

const SHOWCASE_TABS: readonly TabItem[] = [
  { id: 'tokens', label: 'Tokens' },
  { id: 'components', label: 'Components' },
  { id: 'navigation', label: 'Navigation' },
];

@Component({
  selector: 'app-design-system-showcase',
  imports: [
    AlertComponent,
    BadgeComponent,
    BreadcrumbComponent,
    ButtonComponent,
    CardComponent,
    CheckboxDirective,
    DataTableComponent,
    DialogComponent,
    DividerComponent,
    DropdownComponent,
    EmptyStateComponent,
    FilterChipComponent,
    FormFieldComponent,
    IconButtonComponent,
    InputDirective,
    MenuItemComponent,
    MobileNavTriggerComponent,
    NavigationItemComponent,
    PaginationComponent,
    ProgressComponent,
    RadioDirective,
    SegmentedControlComponent,
    SectionHeadingComponent,
    SkeletonComponent,
    SpinnerComponent,
    TabsComponent,
    ThemeToggleComponent,
    ToggleComponent,
    TooltipDirective,
    AvatarComponent,
  ],
  templateUrl: './design-system-showcase.html',
  styleUrl: './design-system-showcase.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemShowcaseComponent {
  private readonly toastService = inject(ToastService);
  protected readonly activeTab = signal('tokens');
  protected readonly dialogOpen = signal(false);
  protected readonly mobileNavOpen = signal(false);
  protected readonly currentPage = signal(3);
  protected readonly activeSegment = signal('all');
  protected readonly filterChipSelected = signal(false);
  protected readonly selectedTableKeys = signal<readonly DataTableRowKey[]>([]);
  protected readonly tabs = SHOWCASE_TABS;
  protected readonly tableRows = SHOWCASE_ROWS;
  protected readonly tableColumns = SHOWCASE_COLUMNS;
  protected readonly tableActions = SHOWCASE_ACTIONS;
  protected readonly tableRowKey = (row: ShowcaseRow): string => row.id;
  protected readonly segments = SHOWCASE_SEGMENTS;
  protected readonly colorTokens = [
    { name: 'Background', variable: '--color-background' },
    { name: 'Secondary background', variable: '--color-background-secondary' },
    { name: 'Surface', variable: '--color-surface' },
    { name: 'Elevated surface', variable: '--color-surface-elevated' },
    { name: 'Primary text', variable: '--color-text-primary' },
    { name: 'Secondary text', variable: '--color-text-secondary' },
    { name: 'Muted text', variable: '--color-text-muted' },
    { name: 'Primary accent', variable: '--color-brand-primary' },
    { name: 'Secondary accent', variable: '--color-brand-secondary' },
    { name: 'Success', variable: '--color-success' },
    { name: 'Success surface', variable: '--color-success-surface' },
    { name: 'Warning', variable: '--color-warning' },
    { name: 'Warning surface', variable: '--color-warning-surface' },
    { name: 'Error', variable: '--color-error' },
    { name: 'Error surface', variable: '--color-error-surface' },
    { name: 'Information', variable: '--color-information' },
    { name: 'Information surface', variable: '--color-information-surface' },
    { name: 'Focus', variable: '--color-focus' },
    { name: 'Border', variable: '--color-border' },
  ] as const;
  protected readonly spacingTokens = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32] as const;
  protected readonly radiusTokens = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
  protected readonly shadowTokens = [
    'none',
    'subtle',
    'card',
    'elevated',
    'modal',
    'focus',
  ] as const;

  protected showToast(): void {
    this.toastService.show({
      title: 'Preview notification',
      description: 'This toast demonstrates the shared feedback foundation.',
      variant: 'success',
    });
  }

  protected notify(message: string): void {
    this.toastService.show({ title: message });
  }

  protected toggleMobileNav(): void {
    this.mobileNavOpen.update((open) => !open);
  }
}
