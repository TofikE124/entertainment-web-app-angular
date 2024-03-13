import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularTitleComponent } from './regular-title.component';

describe('RegularTitleComponent', () => {
  let component: RegularTitleComponent;
  let fixture: ComponentFixture<RegularTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegularTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegularTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
