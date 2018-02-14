import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeminuevoComponent }   from "./seminuevo.component";
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      component: SeminuevoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeminuevoRoutingModule { }
