import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieManage } from './movie-manage';

describe('MovieManage', () => {
  let component: MovieManage;
  let fixture: ComponentFixture<MovieManage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieManage],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieManage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
