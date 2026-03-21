import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../../../core/services/movie.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './coming-soon.html',
  styleUrl: './coming-soon.scss',
})
export class ComingSoon {
  private movieService = inject(MovieService);
  
  movies = toSignal(this.movieService.getComingSoonMovies(), { initialValue: [] });
}
