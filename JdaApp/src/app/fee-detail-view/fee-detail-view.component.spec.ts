import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeDetailViewComponent } from './fee-detail-view.component';

describe('FeeDetailViewComponent', () => {
  let component: FeeDetailViewComponent;
  let fixture: ComponentFixture<FeeDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
