import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSuccessComponent } from './register-success.component';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterSuccessComponent', () => {
  let component: RegisterSuccessComponent;
  let fixture: ComponentFixture<RegisterSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterSuccessComponent],
      imports: [HttpClientModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
