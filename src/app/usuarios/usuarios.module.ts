import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { UsuariosRoutingModule }    from "./usuarios-routing.module"
import { UsuariosComponent  }       from "./usuarios.component";
import { FormsModule }              from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { SharedPipesModule, 
         SortableTableModule }      from '../shared';
import { ReactiveFormsModule }      from "@angular/forms";
import { DataTablesModule }         from 'angular-datatables';
import { PromocionesService } from "../promociones/promociones.service";

@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedPipesModule,
    SortableTableModule,
    ReactiveFormsModule,
    DataTablesModule.forRoot()
  ],
  declarations: [
    UsuariosComponent
  ],
  providers:[
    PromocionesService
  ]
})
export class UsuariosModule { }
