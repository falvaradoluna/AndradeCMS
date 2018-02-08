import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { CatunidadComponent }   from "./catunidad.component";
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      component: CatunidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatunidadRoutingModule { }
