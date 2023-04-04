import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueDonutComponent } from './revenue-donut.component';

describe('RevenueDonutComponent', () => {
  let component: RevenueDonutComponent;
  let fixture: ComponentFixture<RevenueDonutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueDonutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should have as title 'ng2-charts-demo'`, () => {
    const fixture = TestBed.createComponent(RevenueDonutComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ng2-charts-demo');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(RevenueDonutComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('ng2-charts-demo app is running!');
  });
});
