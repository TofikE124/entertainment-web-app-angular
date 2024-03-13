import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailImageComponent } from './thumbnail-image.component';

describe('ThumbnailImageComponent', () => {
  let component: ThumbnailImageComponent;
  let fixture: ComponentFixture<ThumbnailImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThumbnailImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThumbnailImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
