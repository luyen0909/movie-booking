import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/movie-list/movie-list').then(m => m.MovieList)
  },
  // THÊM ĐOẠN NÀY ĐỂ MỞ TRANG CHI TIẾT KHI CÓ ID
  {
    path: ':id',
    loadComponent: () => import('./pages/movie-detail/movie-detail').then(m => m.MovieDetail)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
