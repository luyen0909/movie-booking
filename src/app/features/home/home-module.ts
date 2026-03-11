import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing-module';
import { Home } from './home';
import { HomeBanner } from './component/banner';

@NgModule({
  declarations: [Home],
  imports: [
    CommonModule, 
    HomeRoutingModule,
    HomeBanner 
  ],
})
export class HomeModule {}