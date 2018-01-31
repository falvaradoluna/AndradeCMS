import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DirectorioComponent } from './directorio.component';
const routes: Routes = [
  {
      path: '',
      component: DirectorioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorioRoutingModule { }
