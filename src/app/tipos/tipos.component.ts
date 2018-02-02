import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { trigger,style,transition,animate,keyframes,query,stagger,group, state, animateChild } from '@angular/animations';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    NgForm,
  } from '@angular/forms';
  import  swal  from "sweetalert2";
  import { TiposService } from "./tipos.service";

  //Interfaces
  import { IdataSelect } from "./dataSelect";

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.scss']
})
export class TiposComponent implements OnInit {
    errorMessage:   any;
    getUrl:         any;
    bodyshow:       any;
    temp_var:       Object = false;
    resultadosTipo: any;
    cabecerasTipo:  any;
    cabeceras:      any[] = [];
    items:          any[] = [];

  constructor(private _serviceTipos: TiposService,private modalService: NgbModal, public fb: FormBuilder, 
            private router: Router) { }

    ResultadosTabla: IdataSelect[] = []

    ngOnInit() {
        this.getUrl = this.router.url;
        var array = this.getUrl.split('/');
        if( array[2] === "tipotransmision" ){
            this.bodyshow = 1;
            var query = "SELECT tc_ClaveCombustible, tc_Descripcion, em_Descripcion FROM [dbo].[TipoCombustible] AS TPC INNER JOIN [dbo].[Empresa] AS EMP ON EMP.em_IdEmpresa = TPC.tc_idEmpresa";
            this.selectTable(query);
        }
    }

    selectTable(query){
        this.items          = [];
        this.cabeceras      = [];
        this.cabecerasTipo  = [];
        this.resultadosTipo = [];
        this.temp_var = false;

        this._serviceTipos.getTable({ query: query })
        .subscribe( resultadoMarca => {
            this.resultadosTipo = resultadoMarca;
            this.cabecerasTipo = resultadoMarca[0]
            this.temp_var = true;
            for (var key in this.cabecerasTipo) {
                this.items.push( key );
                this.cabeceras.push( this.parseTitle( key ));
            }
        },
        error => this.errorMessage = <any>error );
    };

    parseTitle( campo ){
        var array    = campo.split('_');
        var capital1 = array[1].substring(0, 1);
        var capital2 = array[1].substring(0, 1).toUpperCase();
        var nombre   = array[1].replace( capital1, capital2 );
        return nombre.match(/[A-Z][a-z]+/g).join(' ');
    }

}
