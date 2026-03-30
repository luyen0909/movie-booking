import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Movie, MovieService } from '../../../../core/services/movie.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  private fb = inject(FormBuilder);
  private movieService = inject(MovieService);

  loading = signal(false);
  results = signal<Movie[]>([]);
  searched = signal(false);

  form = this.fb.nonNullable.group({
    keyword: [''],
  });

  submit() {
    const keyword = this.form.controls.keyword.value.trim();
    this.searched.set(true);

    if (!keyword) {
      this.results.set([]);
      return;
    }

    this.loading.set(true);
    this.movieService.searchMovies(keyword).subscribe({
      next: (movies) => {
        this.results.set(movies);
        this.loading.set(false);
      },
      error: () => {
        this.results.set([]);
        this.loading.set(false);
      },
    });
  }
}
