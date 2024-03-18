import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingTrendingTitleComponent } from './loading-trending-title.component';

describe('LoadingTrendingTitleComponent', () => {
  let component: LoadingTrendingTitleComponent;
  let fixture: ComponentFixture<LoadingTrendingTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingTrendingTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingTrendingTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
