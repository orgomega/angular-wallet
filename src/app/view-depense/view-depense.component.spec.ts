import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDepenseComponent } from './view-depense.component';

describe('ViewDepenseComponent', () => {
  let component: ViewDepenseComponent;
  let fixture: ComponentFixture<ViewDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDepenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
