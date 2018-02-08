import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposComponent } from "./tipos.component";
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      component: TiposComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposRoutingModule { }
