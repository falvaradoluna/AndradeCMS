import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarcasemiComponent } from './marcasemi.component';
const routes: Routes = [
  {
      path: '',
      component: MarcasemiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcasemiRoutingModule { }
