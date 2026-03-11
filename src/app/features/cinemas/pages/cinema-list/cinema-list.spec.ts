import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaList } from './cinema-list';

describe('CinemaList', () => {
  let component: CinemaList;
  let fixture: ComponentFixture<CinemaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaList],
    }).compileComponents();

    fixture = TestBed.createComponent(CinemaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
