import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { SeminuevoRoutingModule }   from "./seminuevo-routing.module";
import { SeminuevoComponent }       from "./seminuevo.component";
import { SeminuevoService }         from "./seminuevo.service";
import { PromocionesService }       from "../promociones/promociones.service";
import { FormsModule }              from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { SharedPipesModule, 
         SortableTableModule }      from '../shared';
import {ReactiveFormsModule}        from "@angular/forms";
import { DataTablesModule }         from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    SeminuevoRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedPipesModule,
    SortableTableModule,
    ReactiveFormsModule,
    DataTablesModule.forRoot(),
  ],
  declarations: [
    SeminuevoComponent
  ],
  providers:[
    SeminuevoService,
    PromocionesService
]
})
export class SeminuevoModule { }
