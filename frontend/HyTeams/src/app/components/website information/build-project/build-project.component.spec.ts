import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildProjectComponent } from './build-project.component';
import { HttpClientModule } from '@angular/common/http';

describe('BuildProjectComponent', () => {
  let component: BuildProjectComponent;
  let fixture: ComponentFixture<BuildProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildProjectComponent],
      imports: [HttpClientModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
