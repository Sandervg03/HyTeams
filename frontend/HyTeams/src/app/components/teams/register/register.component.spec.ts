import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRegisterComponent } from './register.component';
import { HttpClientModule } from '@angular/common/http';

describe('TeamRegisterComponent', () => {
  let component: TeamRegisterComponent;
  let fixture: ComponentFixture<TeamRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamRegisterComponent],
      imports: [HttpClientModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
