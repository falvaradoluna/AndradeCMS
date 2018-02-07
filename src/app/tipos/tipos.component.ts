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
  //Import Servicios
  import { TiposService } from "./tipos.service";
  import { PromocionesService } from "../promociones/promociones.service";

  //Interfaces
  import { IdataSelect } from "./dataSelect";
  import { IEmpresas } from "../promociones/empresas";
  import { IServerResponse } from "./ServerResponse";

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.scss']
})
export class TiposComponent implements OnInit {
    //Variables
    errorMessage:   any;
    getUrl:         any;
    bodyshow:       any;
    temp_var:       Object = false;
    resultadosTipo: any;
    cabecerasTipo:  any;
    cabeceras:      any[] = [];
    items:          any[] = [];
    queryTrans:     string;

    //Formularios
    formInsert: FormGroup;
    ModalClave          = new FormControl("", Validators.required);
    ModalDescripcion    = new FormControl("", Validators.required);
    SelectEmpresa       = new FormControl(0, Validators.required);

  constructor(private _serviceTipos: TiposService, 
            private modalService: NgbModal, 
            public fb: FormBuilder, 
            private router: Router,
            private _Promoservice: PromocionesService) {
                this.formInsert = fb.group({
                    "ModalClave":       this.ModalClave,
                    "ModalDescripcion": this.ModalDescripcion,
                    "SelectEmpresa":    this.SelectEmpresa
                });
             }

    ResultadosTabla:    IdataSelect[] = []
    resultadoEmpresas:  IEmpresas[] = []
    serverResponse:     IServerResponse[] = [];

    ngOnInit() {
        this.getEmpresas();
        this.getUrl = this.router.url;
        var array = this.getUrl.split('/');
        if( array[2] === "tipotransmision" ){
            this.bodyshow = 1;
            this.queryTrans = "SELECT tt_ClaveTransmision, tt_Descripcion, em_Descripcion FROM [dbo].[TipoTransmision] AS TPT INNER JOIN [dbo].[Empresa] AS EMP ON EMP.em_IdEmpresa = TPT.tt_idEmpresa WHERE TPT.tt_Estatus = 1 ORDER BY TPT.tt_idEmpresa ASC";
            this.selectTable(this.queryTrans);
        }else if(array[2] === "tipocombustible"){
            this.bodyshow = 2;
            var query = "SELECT tc_ClaveCombustible, tc_Descripcion, em_Descripcion FROM [dbo].[TipoCombustible] AS TPC INNER JOIN [dbo].[Empresa] AS EMP ON EMP.em_IdEmpresa = TPC.tc_idEmpresa ORDER BY TPC.tc_idEmpresa";
            this.selectTable(query);
        }
    };

    getEmpresas(): void{
        this._Promoservice.getEmpresas()
        .subscribe( resultadoEmpresas => {
            this.resultadoEmpresas = resultadoEmpresas;
        },
        error => this.errorMessage = <any>error);
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

    saveInsert(): void{
        if( this.bodyshow == 1 ){
            var showTitle = "¿Desea guardar el tipo de transmisión?" 
        }
        swal({
            title: showTitle,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
        }).then((result) => {
            if (result.value) {
                console.log( this.formInsert.value );
                var clave = this.formInsert.value.ModalClave;
                var descripcion = this.formInsert.value.ModalDescripcion;
                var empresa = this.formInsert.value.SelectEmpresa;
                this._serviceTipos.Insert({ clave: clave, descripcion: descripcion, empresa: empresa, use: this.bodyshow })
                .subscribe( serverResponse => {
                    this.serverResponse = serverResponse;
                    console.log( "Repuestadelservidor", this.serverResponse );
                    if(this.serverResponse[0].success == 1){
                        swal(
                            'Guardado',
                            this.serverResponse[0].msg,
                            'success'
                        );
                    }else{
                        swal(
                            'Error',
                            this.serverResponse[0].msg,
                            'error'
                        );
                    }
                },
                error => this.errorMessage = <any>error);
            } else if (result.dismiss === 'cancel') {
                if( this.bodyshow == 1 ){
                    var showCancel = "No se guardo el tipo de transmisión" 
                }
              swal(
                'Canelado',
                showCancel,
                'error'
              );
            }
        });
    };

    delete(idTipo){
        if( this.bodyshow == 1 ){
            var showTitle = "¿Desea eliminar el tipo de transmisión?"; 
        }else if(this.bodyshow == 2){
            var showTitle = "¿Desea eliminar el tipo de combustible?";
        }
        swal({
            title: showTitle,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
        }).then((result) => {
            if (result.value) {
                var claveId = idTipo;
                this._serviceTipos.Delete({ claveId: claveId, use: this.bodyshow })
                .subscribe( serverResponse => {
                    this.serverResponse = serverResponse;
                    if(this.serverResponse[0].success == 1){
                        swal(
                            'Eliminado',
                            this.serverResponse[0].msg,
                            'success'
                        );
                        if( this.bodyshow == 1 ){
                            this.selectTable(this.queryTrans);
                        }
                    }else{
                        swal(
                            'Error',
                            this.serverResponse[0].msg,
                            'error'
                        );
                    }
                },
                error => this.errorMessage = <any>error);
            } else if (result.dismiss === 'cancel') {
                if( this.bodyshow == 1 ){
                    var showCancel = "No se elimino el tipo de transmisión";
                }else if( this.bodyshow == 2 ){
                    var showCancel = "No se elimino el tipo de combustible";
                }
              swal(
                'Canelado',
                showCancel,
                'error'
              );
            }
        });
    };

    //=================================================== M O D A L E S ============================================//

    //========= MODAL INSERT ========//
    openModalIns(ModalInsert) {
        this.modalService.open( ModalInsert );
        this.formInsert = this.fb.group({
            "ModalClave":       "",
            "ModalDescripcion": "",
            "SelectEmpresa":    ""
        });
    }

    private getDismissReasonopenModalIns(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    //========= MODAL UPDATE ========//
    openModalUp(ModalUpdate, clave) {
        this.modalService.open( ModalUpdate );
        this._serviceTipos.getById( {clave: clave, use: this.bodyshow} )
        .subscribe( ResultadosTabla => {
            this.ResultadosTabla = ResultadosTabla;
            console.log( "ResultadoServerMOdal", ResultadosTabla );
            this.formInsert = this.fb.group({
                "ModalClave":       ResultadosTabla[0].tt_ClaveTransmision,
                "ModalDescripcion": ResultadosTabla[0].tt_Descripcion,
                "SelectEmpresa":    ResultadosTabla[0].tt_idEmpresa
            });
        },
        error => this.errorMessage = <any>error);
    }

    private getDismissReasonopenModalUp(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

}
