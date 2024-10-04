import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscitalaComponent } from './escitala.component';

describe('EscitalaComponent', () => {
  let component: EscitalaComponent;
  let fixture: ComponentFixture<EscitalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscitalaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscitalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
