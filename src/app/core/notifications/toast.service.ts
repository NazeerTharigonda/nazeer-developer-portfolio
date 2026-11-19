import { DestroyRef, Injectable, inject, signal } from '@angular/core';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error';

export interface ToastMessage {
  readonly id: number;
  readonly title: string;
  readonly description?: string;
  readonly variant: ToastVariant;
  readonly leaving?: boolean;
}

export interface ToastOptions {
  readonly title: string;
  readonly description?: string;
  readonly variant?: ToastVariant;
  readonly durationMs?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly timers = new Map<number, ReturnType<typeof setTimeout>>();
  private nextId = 0;
  readonly messages = signal<readonly ToastMessage[]>([]);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.timers.forEach((timer) => clearTimeout(timer));
      this.timers.clear();
    });
  }

  show(options: ToastOptions): number {
    const id = ++this.nextId;
    const message: ToastMessage = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? 'default',
    };

    this.messages.update((messages) => [...messages, message]);

    if ((options.durationMs ?? 5000) > 0) {
      this.timers.set(
        id,
        setTimeout(() => this.dismiss(id), options.durationMs ?? 5000),
      );
    }

    return id;
  }

  dismiss(id: number): void {
    const timer = this.timers.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    this.messages.update((messages) =>
      messages.map((message) => (message.id === id ? { ...message, leaving: true } : message)),
    );
  }

  remove(id: number): void {
    this.messages.update((messages) => messages.filter((message) => message.id !== id));
  }
}
