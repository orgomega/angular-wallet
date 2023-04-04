import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettesComponent } from './dettes.component';

describe('DettesComponent', () => {
  let component: DettesComponent;
  let fixture: ComponentFixture<DettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
