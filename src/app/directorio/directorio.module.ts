import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorioRoutingModule } from './directorio-routing.module';
import { DirectorioComponent } from './directorio.component';
import { DirectorioService } from './directorio.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedPipesModule,
         SortableTableModule } from '../shared';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    imports: [
        CommonModule,
        DirectorioRoutingModule,
        FormsModule,
        NgbModule.forRoot(),
        SharedPipesModule,
        SortableTableModule,
        DataTablesModule.forRoot()
    ],
    declarations: [
        DirectorioComponent
    ],
    providers: [
        DirectorioService
    ]
})
export class DirectorioModule { }
