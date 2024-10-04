import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElgamalComponent } from './elgamal.component';

describe('ElgamalComponent', () => {
  let component: ElgamalComponent;
  let fixture: ComponentFixture<ElgamalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElgamalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElgamalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
