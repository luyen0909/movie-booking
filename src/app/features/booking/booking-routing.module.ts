import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', // Sẽ xử lý route '/booking'
    loadComponent: () => import('./pages/seat-selection/seat-selection').then(m => m.SeatSelection)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}