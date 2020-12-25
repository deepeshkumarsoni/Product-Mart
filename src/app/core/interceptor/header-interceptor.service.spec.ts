import { TestBed } from '@angular/core/testing';

import { headerInterceptorService } from './header-interceptor.service';

describe('HeaderInterceptorService', () => {
  let service: headerInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(headerInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
