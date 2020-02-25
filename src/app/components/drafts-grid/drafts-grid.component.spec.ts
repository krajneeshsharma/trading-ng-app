import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftsGridComponent } from './drafts-grid.component';

describe('DraftsGridComponent', () => {
  let component: DraftsGridComponent;
  let fixture: ComponentFixture<DraftsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
