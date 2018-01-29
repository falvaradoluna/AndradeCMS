import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TipounidadComponent } from "./tipounidad.component";

const routes: Routes = [
  {
      path: '',
      component: TipounidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipounidadRoutingModule { }
