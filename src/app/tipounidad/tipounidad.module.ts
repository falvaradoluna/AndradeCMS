import { NgModule } from '@angular/core';
import { TipounidadRoutingModule } from "./tipounidad-routing.module";
import { TipounidadComponent } from "./tipounidad.component";
import { TipounidadService } from "./tipounidad.service";
import { CommonModule } from '@angular/common';
import { FormsModule }              from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { SharedPipesModule, 
         SortableTableModule }      from '../shared';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    TipounidadRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedPipesModule,
    SortableTableModule,
    ReactiveFormsModule
  ],
  declarations: [
    TipounidadComponent
  ],
  providers:[
    TipounidadService
]
})
export class TipounidadModule { }
