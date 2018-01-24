import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routerTransition } from '../router.animations';
import { trigger,style,transition,animate,keyframes,query,stagger,group, state, animateChild } from '@angular/animations';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    NgForm,
} from '@angular/forms';
import { EmpresaService } from "./empresa.service";

//Interfaces para recoger los datos
import { IEmpresas } from "./empresas";

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.component.html',
    styleUrls: ['./empresa.component.scss'],
    animations: [routerTransition()]
})

export class EmpresaComponent implements OnInit {
    errorMessage: any;
    constructor( private _EmpService: EmpresaService ) { }

    //Constantes para cahcar los datos de las interfaces
    resultadoEmpresas: IEmpresas[] = [];

    ngOnInit() {
        this.getEmpresas();
    }

    getEmpresas(): void{
        this._EmpService.getEmpresas()
        .subscribe( resultadoEmpresas => {
            this.resultadoEmpresas = resultadoEmpresas;
            console.log( this.resultadoEmpresas )
        },
        error => this.errorMessage = <any>error);
    }

}
