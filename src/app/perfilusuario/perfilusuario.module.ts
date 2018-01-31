import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilusuarioRoutingModule } from "./perfilusuario-routing.module";
import { PerfilusuarioComponent } from "./perfilusuario.component";
import { FormsModule }              from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { SharedPipesModule, 
         SortableTableModule }      from '../shared';
import { ReactiveFormsModule }      from "@angular/forms";
import { DataTablesModule }         from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    PerfilusuarioRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedPipesModule,
    SortableTableModule,
    ReactiveFormsModule,
    DataTablesModule.forRoot()
  ],
  declarations: [
    PerfilusuarioComponent
  ],
})
export class PerfilusuarioModule { }
