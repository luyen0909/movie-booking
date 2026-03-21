import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../../../core/services/movie.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-now-showing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './now-showing.html',
  styleUrl: './now-showing.scss',
})
export class NowShowing {
  private movieService = inject(MovieService);
  
  movies = toSignal(this.movieService.getNowShowingMovies(), { initialValue: [] });
}
