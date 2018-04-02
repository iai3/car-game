import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuntCar } from './stunt-car.component';

describe('StuntCarComponent', () => {
  let component: StuntCar;
  let fixture: ComponentFixture<StuntCar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuntCar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuntCar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
