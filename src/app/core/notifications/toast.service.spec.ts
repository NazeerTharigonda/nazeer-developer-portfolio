import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  it('adds and dismisses notifications by id', () => {
    TestBed.configureTestingModule({ providers: [ToastService] });
    const service = TestBed.inject(ToastService);

    const id = service.show({ title: 'Saved', variant: 'success', durationMs: 0 });
    expect(service.messages()).toHaveLength(1);
    expect(service.messages()[0].title).toBe('Saved');

    service.dismiss(id);
    expect(service.messages()[0].leaving).toBe(true);

    service.remove(id);
    expect(service.messages()).toHaveLength(0);
  });
});
