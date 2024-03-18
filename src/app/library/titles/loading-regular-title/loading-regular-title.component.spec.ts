import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingRegularTitleComponent } from './loading-regular-title.component';

describe('LoadingRegularTitleComponent', () => {
  let component: LoadingRegularTitleComponent;
  let fixture: ComponentFixture<LoadingRegularTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingRegularTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingRegularTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
