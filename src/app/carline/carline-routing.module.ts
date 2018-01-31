import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarlineComponent } from './carline.component';
const routes: Routes = [
  {
      path: '',
      component: CarlineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarlineRoutingModule { }
