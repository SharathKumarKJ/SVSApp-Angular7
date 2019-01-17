import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeDetailListComponent } from './fee-detail-list.component';

describe('FeeDetailListComponent', () => {
  let component: FeeDetailListComponent;
  let fixture: ComponentFixture<FeeDetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeDetailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
