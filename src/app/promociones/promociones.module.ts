import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { PromocionesRoutingModule } from './promociones-routing.module';
import { PromocionesComponent }     from './promociones.component';
import { PromocionesService }       from './promociones.service';
import { FormsModule }              from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { SharedPipesModule, 
         SortableTableModule }      from '../shared';
import { DataTablesModule } from 'angular-datatables';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        PromocionesRoutingModule,
        FormsModule,
        NgbModule.forRoot(),
        SharedPipesModule,
        SortableTableModule,
        DataTablesModule.forRoot(),
        ReactiveFormsModule
    ],
    declarations: [
        PromocionesComponent
    ],
    providers:[
        PromocionesService
    ]
})
export class PromocionesModule { }
