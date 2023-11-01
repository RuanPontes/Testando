import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmcimadofooterComponent } from './emcimadofooter.component';

describe('EmcimadofooterComponent', () => {
  let component: EmcimadofooterComponent;
  let fixture: ComponentFixture<EmcimadofooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmcimadofooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmcimadofooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
