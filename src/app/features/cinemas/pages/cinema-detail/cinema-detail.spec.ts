import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaDetail } from './cinema-detail';

describe('CinemaDetail', () => {
  let component: CinemaDetail;
  let fixture: ComponentFixture<CinemaDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(CinemaDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
