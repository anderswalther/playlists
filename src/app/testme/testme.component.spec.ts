import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestmeComponent } from './testme.component';

describe('TestmeComponent', () => {
  let component: TestmeComponent;
  let fixture: ComponentFixture<TestmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestmeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
