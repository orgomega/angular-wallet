import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseDonutComponent } from './depense-donut.component';

describe('DepenseDonutComponent', () => {
  let component: DepenseDonutComponent;
  let fixture: ComponentFixture<DepenseDonutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseDonutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
