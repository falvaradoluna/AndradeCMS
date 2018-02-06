import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposRoutingModule } from "./tipos-routing.module";
import { TiposComponent } from "./tipos.component";
import { TiposService } from "./tipos.service";
import { PromocionesService }       from "../promociones/promociones.service";
import { FormsModule }              from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { SharedPipesModule, 
         SortableTableModule }      from '../shared';
import {ReactiveFormsModule} from "@angular/forms";
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    TiposRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedPipesModule,
    SortableTableModule,
    ReactiveFormsModule,
    DataTablesModule.forRoot()
  ],
  declarations: [
    TiposComponent
  ],
  providers:[
    TiposService,
    PromocionesService
]
})
export class TiposModule { }
