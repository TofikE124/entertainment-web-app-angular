import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedProfileComponent } from './logged-profile.component';

describe('LoggedProfileComponent', () => {
  let component: LoggedProfileComponent;
  let fixture: ComponentFixture<LoggedProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoggedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
