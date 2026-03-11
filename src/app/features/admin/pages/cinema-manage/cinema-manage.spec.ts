import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaManage } from './cinema-manage';

describe('CinemaManage', () => {
  let component: CinemaManage;
  let fixture: ComponentFixture<CinemaManage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaManage],
    }).compileComponents();

    fixture = TestBed.createComponent(CinemaManage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
