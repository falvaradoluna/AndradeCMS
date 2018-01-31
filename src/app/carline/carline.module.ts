import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarlineRoutingModule } from './carline-routing.module';
import { CarlineComponent } from './carline.component';
import { CarlineService } from './carline.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedPipesModule,
         SortableTableModule } from '../shared';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    imports: [
        CommonModule,
        CarlineRoutingModule,
        FormsModule,
        NgbModule.forRoot(),
        SharedPipesModule,
        SortableTableModule,
        DataTablesModule.forRoot()
    ],
    declarations: [
        CarlineComponent
    ],
    providers: [
        CarlineService
    ]
})
export class CarlineModule { }
