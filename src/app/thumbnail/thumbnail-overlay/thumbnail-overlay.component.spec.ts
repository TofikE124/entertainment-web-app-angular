import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailOverlayComponent } from './thumbnail-overlay.component';

describe('ThumbnailOverlayComponent', () => {
  let component: ThumbnailOverlayComponent;
  let fixture: ComponentFixture<ThumbnailOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThumbnailOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThumbnailOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
