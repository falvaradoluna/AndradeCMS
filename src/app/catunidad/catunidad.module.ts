import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { CatunidadRoutingModule }   from "./catunidad-routing.module";
import { CatunidadComponent }       from "./catunidad.component";
import { CatunidadService }         from "./catunidad.service";
import { PromocionesService }       from "../promociones/promociones.service";
import { FormsModule }              from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { SharedPipesModule, 
         SortableTableModule }      from '../shared';
import {ReactiveFormsModule}        from "@angular/forms";
import { DataTablesModule }         from 'angular-datatables';
import { PdfViewerModule }          from 'ng2-pdf-viewer';


@NgModule({
  imports: [
    CommonModule,
    CatunidadRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedPipesModule,
    SortableTableModule,
    ReactiveFormsModule,
    DataTablesModule.forRoot(),
    PdfViewerModule
  ],
  declarations: [
    CatunidadComponent
  ],
  providers:[
    CatunidadService,
    PromocionesService
]
})
export class CatunidadModule { }
