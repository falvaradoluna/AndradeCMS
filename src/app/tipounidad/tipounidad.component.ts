import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
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
import  swal  from "sweetalert2";

//Service
import { TipounidadService } from "./tipounidad.service";

@Component({
  selector: 'app-tipounidad',
  templateUrl: './tipounidad.component.html',
  styleUrls: ['./tipounidad.component.scss'],
  animations: [routerTransition()]
})
export class TipounidadComponent implements OnInit {

    showBody:any;
    resultadosTipo : any;
    cabecerasTipo : any;
    cabeceras:any[]=[];
    items:any[]=[];
    getUrl: string;
    claveMon:string;
    public temp_var: Object = false;
    descripUpdate: string = ""; 
    id_tipoUnidad: number = 0;

    formInsTipoU: FormGroup;
    tipoUnidadDesc = new FormControl("", Validators.required);

    formInsTipoUAct: FormGroup;
    tipoUnidadDescAct   = new FormControl("", Validators.required);
    IdTipoUnidad        = new FormControl("");

    formInsMoneda: FormGroup;
    ClaveMoneda = new FormControl("", Validators.required);
    Moneda      = new FormControl("", Validators.required);

    constructor(private _http: HttpClient, 
            private router: Router,
            private modalService: NgbModal,
            public fb: FormBuilder) {
                this.formInsTipoU = fb.group({
                    "tipoUnidadDesc": this.tipoUnidadDesc
                });

                this.formInsTipoUAct = fb.group({
                    "tipoUnidadDescAct":    this.tipoUnidadDescAct,
                    "IdTipoUnidad":         this.IdTipoUnidad
                });

                this.formInsMoneda = fb.group({
                    "ClaveMoneda":  this.ClaveMoneda,
                    "Moneda":       this.Moneda
                });
             }

    //Peticiones URL
    private _urlTUnidad   = "api/tipo/tipounidad";
    private _urlInsert    = "api/tipo/insert"
    private _urlDelete    = "api/tipo/delete"
    private _urlTpById    = "api/tipo/gettipounidadbyid"
    private _urlUpdate    = "api/tipo/update";
    private _urlMonById   = "api/tipo/monedabyid";

    ngOnInit() {
       this.sendSelect();
    }

    sendSelect(){
        this.getUrl = this.router.url;
        var array = this.getUrl.split('/');

        if( array[2] === "tipounidad" ){
            this.getTipo(`SELECT tu_IdTipo, tu_Descripcion FROM [dbo].[TipoUnidad] WHERE tu_IdEstatus = 1;`);
            this.showBody = 1;
        }else if( array[2] === "moneda" ){
            this.getTipo(`SELECT mo_ClaveClasif, mo_Descripcion FROM [dbo].[Moneda] WHERE mo_Estatus = 1;`);
            this.showBody = 2;
        }else if( array[2] === "pais" ){
            this.getTipo(`SELECT po_ClavePais, po_Descripcion FROM [dbo].[PaisOrigen] WHERE po_IdStatus = 1;`);
            this.showBody = 3;
        }
    }

    getTipo( table ){
        this.items          = [];
        this.cabeceras      = [];
        this.cabecerasTipo  = [];
        this.resultadosTipo = [];
        this.temp_var = false;
        let Params = new HttpParams();
        Params = Params.append("table", table);
        this._http.get(this._urlTUnidad, {params: Params}).subscribe(data => {
            this.resultadosTipo = data;
            this.cabecerasTipo = data[0];
            this.temp_var = true;
            for (var key in this.cabecerasTipo) {
                this.items.push( key );
                this.cabeceras.push( this.parseTitle( key ));
            }
          });
    }

    parseTitle( campo ){
        var array    = campo.split('_');
        var capital1 = array[1].substring(0, 1);
        var capital2 = array[1].substring(0, 1).toUpperCase();
        var nombre   = array[1].replace( capital1, capital2 );
        return nombre.match(/[A-Z][a-z]+/g).join(' ');
    }

    saveTipoUnidad(){
        swal({
            title: '¿Guardar la promoción?',
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
                var TipoU = this.formInsTipoU.value.tipoUnidadDesc;
                var insert = "INSERT INTO [dbo].[TipoUnidad] VALUES ('" + TipoU +  "', 1)";
                let Params = new HttpParams();
                Params = Params.append("insert", insert);
                this._http.get(this._urlInsert, {params: Params}).subscribe(data => {
                    swal(
                        'Guardado',
                        'Se guardo el tipo de unidad',
                        'success'
                      );
                    this.getTipo(`SELECT tu_IdTipo, tu_Descripcion FROM TipoUnidad WHERE tu_IdEstatus = 1;`);
                });
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                'No se guardo la promoción',
                'error'
              );
            }
        });
    }

    updateTipoUnidad(){
        swal({
            title: 'Desea actualizar el Tipo de Unidad?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
        }).then((result) => {
            if (result.value) {
                console.log( this.formInsTipoUAct.value );
                var descripcionUp = this.formInsTipoUAct.value.tipoUnidadDescAct
                var update = "Update [dbo].[TipoUnidad] SET tu_Descripcion ='" + descripcionUp + "' WHERE tu_IdTipo = " + this.formInsTipoUAct.value.IdTipoUnidad;
                let Params = new HttpParams();
                Params = Params.append("update", update);
                this._http.get(this._urlUpdate, {params: Params}).subscribe(data => {
                    swal(
                        'Actualizado',
                        'Se actualizo el tipo de unidad',
                        'success'
                      );
                    this.getTipo(`SELECT tu_IdTipo, tu_Descripcion FROM TipoUnidad WHERE tu_IdEstatus = 1;`);
                });
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                'No se actualizo el tipo de unidad',
                'error'
              );
            }
        });
    };

    deleteTipo(idTipo){
        swal({
            title: 'Desea eliminar el Tipo de Unidad?',
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
                console.log( idTipo )
                var deletes = "Update [dbo].[TipoUnidad] SET tu_IdEstatus = 0 WHERE tu_IdTipo = " + idTipo ;
                let Params = new HttpParams();
                Params = Params.append("deletes", deletes);
                this._http.get(this._urlDelete, {params: Params}).subscribe(data => {
                    swal(
                        'Guardado',
                        'Se guardo el tipo de unidad',
                        'success'
                      );
                    this.getTipo(`SELECT tu_IdTipo, tu_Descripcion FROM TipoUnidad WHERE tu_IdEstatus = 1;`);
                });
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                'No se guardo la promoción',
                'error'
              );
            }
        });
    }

    saveMoneda(){
        swal({
            title: '¿Guardar el tipo de moneda?',
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
                var Clave  = this.formInsMoneda.value.ClaveMoneda;
                var Moneda = this.formInsMoneda.value.Moneda;
                var insert = "INSERT INTO [dbo].[Moneda] VALUES ('" + Clave +  "', '" + Moneda + "', 1)";
                let Params = new HttpParams();
                Params = Params.append("insert", insert);
                this._http.get(this._urlInsert, {params: Params}).subscribe(data => {
                    swal(
                        'Guardado',
                        'Se guardo el tipo de moneda.',
                        'success'
                    );
                    this.getTipo(`SELECT mo_ClaveClasif, mo_Descripcion FROM [dbo].[Moneda] WHERE mo_Estatus = 1;`);
                });
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                'No se guardo el tipo de moneda.',
                'error'
              );
            }
        });
    }

    UpdateMoneda(){
        swal({
            title: 'Desea actualizar el Tipo de moneda?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
        }).then((result) => {
            if (result.value) {
                var ClaveMoneda = this.formInsMoneda.value.ClaveMoneda;
                var Moneda = this.formInsMoneda.value.Moneda;
                var update = "Update [dbo].[Moneda] SET mo_ClaveClasif ='" + ClaveMoneda + "', mo_Descripcion = '" + Moneda + "' WHERE mo_ClaveClasif = '" + this.claveMon + "'";
                let Params = new HttpParams();
                Params = Params.append("update", update);
                this._http.get(this._urlUpdate, {params: Params}).subscribe(data => {
                    console.log( data );
                    if( data[0].succes == 1 ){
                        console.log( "Aqui" );
                        swal(
                            'Actualizado',
                            data[0].msg,
                            'success'
                        );    
                        this.getTipo('SELECT mo_ClaveClasif, mo_Descripcion FROM [dbo].[Moneda] WHERE mo_Estatus = 1;');
                    }else{
                        swal(
                            'Error',
                            data[0].msg,
                            'error'
                        );
                    }
                });
            } else if (result.dismiss === 'cancel') {
                swal(
                    'Canelado',
                    'No se actualizo el tipo de moneda',
                    'error'
                );
            }
        });
    };

    deleteMoneda(ClaveMon){
        swal({
            title: '¿Desea eliminar el Tipo de Moneda?',
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
                var deletes = "Update [dbo].[Moneda] SET mo_Estatus = 0 WHERE mo_ClaveClasif = '" + ClaveMon + "'" ;
                let Params = new HttpParams();
                Params = Params.append("deletes", deletes);
                this._http.get(this._urlDelete, {params: Params}).subscribe(data => {
                    swal(
                        'Eliminado',
                        'Se elimino el tipo de moneda',
                        'success'
                      );
                      this.getTipo('SELECT mo_ClaveClasif, mo_Descripcion FROM [dbo].[Moneda] WHERE mo_Estatus = 1;');
                });
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                'No se elimino la moneda',
                'error'
              );
            }
        });
    }

    //======================================================= M O D A L E S=====================================//

    //========= MODAL INSERT TIPO UNIDAD ========//
    openInsTU(InsTipoUnidad) {
        this.modalService.open( InsTipoUnidad );
    }

    private getDismissReasonInsTU(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    //========= MODAL UPDATE TIPO UNIDAD ========//
    openUpdTU(UpdTipoUnidad, tu_IdTipo) {
        this.modalService.open( UpdTipoUnidad );
        let Params = new HttpParams();
        Params = Params.append("tu_IdTipo", tu_IdTipo);
        this._http.get(this._urlTpById, {params: Params}).subscribe(data => {
            this.descripUpdate = data[0].tu_Descripcion 
            this.id_tipoUnidad = data[0].tu_IdTipo;
        });
    }

    private getDismissReasonUpdTU(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    //========= MODAL INSERT MONEDA ========//
    openMoneda(InsMoneda) {
        this.modalService.open( InsMoneda );
    }

    private getDismissReasonInsMon(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    //========= MODAL UPDATE Moneda ========//
    openUpdMO(UpdMoneda, claveMon) {
        this.modalService.open( UpdMoneda );
        this.claveMon = claveMon;
        let Params = new HttpParams();
        Params = Params.append("claveMon", claveMon);
        this._http.get(this._urlMonById, {params: Params}).subscribe(data => { //CREAR EL SERVICIO PARA TRAER MONEDA POR ID
            this.formInsMoneda = this.fb.group({
                "ClaveMoneda":  data[0].mo_ClaveClasif,
                "Moneda":       data[0].mo_Descripcion
            });
        });
    }

    private getDismissReasonUpdMO(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

}
