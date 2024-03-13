import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingTitleComponent } from './trending-title.component';

describe('TrendingTitleComponent', () => {
  let component: TrendingTitleComponent;
  let fixture: ComponentFixture<TrendingTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrendingTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
