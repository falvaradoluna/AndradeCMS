import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcasemiRoutingModule } from './marcasemi-routing.module';
import { MarcasemiComponent } from './marcasemi.component';
import { MarcasemiService } from './marcasemi.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedPipesModule,
         SortableTableModule } from '../shared';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    imports: [
        CommonModule,
        MarcasemiRoutingModule,
        FormsModule,
        NgbModule.forRoot(),
        SharedPipesModule,
        SortableTableModule,
        DataTablesModule.forRoot()
    ],
    declarations: [
        MarcasemiComponent
    ],
    providers: [
        MarcasemiService
    ]
})
export class MarcasemiModule { }
