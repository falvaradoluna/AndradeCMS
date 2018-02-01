import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PerfilusuarioComponent } from "./perfilusuario.component"

const routes: Routes = [
  {
      path: '',
      component: PerfilusuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilusuarioRoutingModule { }
