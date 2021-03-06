import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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

import { PromocionesService } from "./promociones.service";
import { IPromociones } from "./promociones";
import { IServerResponse } from "./ServerResponse";
import { IEmpresas } from "./empresas";
import { ITipoPromocion } from "./tipo-promocion";
import { IMarca } from "./marca";
import { ISucursal } from "./sucursal";
import { stringify } from 'querystring';
import { IPromise } from 'protractor/node_modules/@types/q';
import { IPromocionesById } from "./promocionById";
import { Iimage } from "./Img";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import  swal  from "sweetalert2";
import { CatunidadService } from "../catunidad/catunidad.service";
import { IParametros } from "../catunidad/parametros";


@Component({
    selector: 'app-promociones',
    templateUrl: './promociones.component.html',
    styleUrls: ['./promociones.component.scss'],
    animations: [routerTransition()]
})
export class PromocionesComponent implements OnInit {
    
    //Variables de parametros;
    public prefijo:  any;
    public rutaSave: any;
    public rutaGet:  any;

    //Variables para el formulario de guardar una nueva promocion
    form: FormGroup;
    SelectTipoPromocion = new FormControl("", Validators.required);
    SelectEmpresa       = new FormControl("", Validators.required);
    SelectSucursal      = new FormControl("", Validators.required);
    SelectMarca         = new FormControl("", Validators.required);
    TxtDescripcion      = new FormControl("", Validators.required);
    imageInput          = new FormControl("");
    idUsuario           = new FormControl("");
    RealImg             = new FormControl("");
    typeImg             = new FormControl("");
    tipoImgtxt          = new FormControl("");
    prefijotxt          = new FormControl("");
    rutaSavetxt         = new FormControl("");
    typeImgUp           = new FormControl("");
    vigencia            = new FormControl("");
    promoId             = new FormControl("");

    //Variables para el formualario de actualizar imagen
    // formUpdate: FormGroup;
    // RealImgUpdate       = new FormControl("");
    // imageInputUpdate    = new FormControl("");
    // promoIdUp           = new FormControl("");
    
    //Variables a utilizar en la clase
    errorMessage: any;

    //ModalImagenVariables
    ModalDesc: string = "";
    ModalImg: string = "";
    ModalIdPromo: number = 0;
    
    selectedEmpresa:number     = 0;
    selectedTPromocion:number  = 0;
    selectedMarca:number       = 0;
    selectedSucursal:number    = 0;
    descripcion: string = "";

    closeResult: string;
    idPromocion: number = 0;
    public data : object;
    public temp_var: Object=false;

    constructor(private _serviceUnidad: CatunidadService, private _Promoservice: PromocionesService, 
                private modalService: NgbModal,     
                public fb: FormBuilder, 
                private _http: HttpClient) { 
        this.form = fb.group({
            "SelectTipoPromocion":  this.SelectTipoPromocion,
            "SelectEmpresa":        this.SelectEmpresa,
            "SelectSucursal":       this.SelectSucursal,
            "SelectMarca":          this.SelectMarca,
            "TxtDescripcion":       this.TxtDescripcion,
            "imageInput":           this.imageInput,
            "idUsuario":            this.idUsuario,
            "RealImg":              this.RealImg,
            "typeImg":              this.typeImg,
            "tipoImgtxt":           this.tipoImgtxt,
            "prefijotxt":           this.prefijotxt,
            "rutaSavetxt":          this.rutaSavetxt,
            "vigencia":             this.vigencia,
            "promoId":              this.promoId

        });
    };

    resultadoPromociones:       IPromociones[] = [];
    resultadoPromocionesById:   IPromocionesById[] = [];
    serverResponse:             IServerResponse[] = [];
    resultadoEmpresas:          IEmpresas[] = [];
    resultadoTPromocion:        ITipoPromocion[] = [];
    resultadoMarca:             IMarca[] = [];
    resultadoSucursal:          ISucursal[] = [];
    resParametros:              IParametros[] = [];


    ngOnInit() {
        this.getParametros("PROMOCION");
        this.getTablaPromociones();
        this.getEmpresas();
        this.getTipoPromocion();
    };

    getParametros(recurso){
        this._serviceUnidad.GetParametros( { recurso: recurso } )
        .subscribe( resParametros => {
            this.resParametros = resParametros;
            // console.log("Parametros",this.resParametros);
            if( this.resParametros[0].pr_TipoParametro == "PREFIJO" ){
                this.prefijo = this.resParametros[0].pr_ValorString1;
            }
            if(this.resParametros[1].pr_TipoParametro == "RUTASAVE"){
                this.rutaSave = this.resParametros[1].pr_ValorString1;
            }
            if(this.resParametros[2].pr_TipoParametro == "RUTAGET"){
                this.rutaGet = this.resParametros[2].pr_ValorString1;
            }
            // console.log("PrefijoPA", this.prefijo);
            // console.log("RUTASAVEPA", this.rutaSave);
            // console.log("RUTAGETPA", this.rutaGet);
        },
        error => this.errorMessage = <any>error);
    };

    getTablaPromociones(): void{
        this._Promoservice.getPromoColumn()
        .subscribe( resultadoPromociones => {
            this.temp_var = true;
            this.resultadoPromociones = resultadoPromociones;
            var getRuta = this.rutaGet;
            var prefijillo = this.prefijo;
            this.resultadoPromociones.forEach(function( item, key ){
                item.pathImagen = getRuta + prefijillo + item.po_IdPromocion + item.ti_Nombre;
            });
        },
        error => this.errorMessage = <any>error);
    }

    getEmpresas(): void{
        this._Promoservice.getEmpresas()
        .subscribe( resultadoEmpresas => {
            this.resultadoEmpresas = resultadoEmpresas;
        },
        error => this.errorMessage = <any>error);
    }

    getTipoPromocion(): void{
        this._Promoservice.getTipoPromocion()
        .subscribe( resultadoTPromocion => {
            this.resultadoTPromocion = resultadoTPromocion;
        },
        error => this.errorMessage = <any>error);
    }

    onChangeEmpresa(newValueEmp: number): void {
        this.selectedEmpresa = newValueEmp;
        this.selectedMarca = 0;
        this.GetMarcaBy_empId(this.selectedEmpresa);
        this.GetSucursalBy_empId(this.selectedEmpresa);
    }

    GetMarcaBy_empId(empId){
        this._Promoservice.GetMarcaBy_empId({ empId: empId })
        .subscribe( resultadoMarca => {
            this.resultadoMarca = resultadoMarca;
        },
        error => this.errorMessage = <any>error );
    }

    GetSucursalBy_empId(empId){
        this._Promoservice.GetSucursalBy_empId({ empId: empId })
        .subscribe( resultadoSucursal => {
            this.resultadoSucursal = resultadoSucursal;
        },
        error => this.errorMessage = <any>error );
    }

    onFileChange($event) {
        let reader = new FileReader();
        let file = $event.target.files[0]; 
        console.log( file.type );
        if( file.type != "image/jpeg" && file.type != "image/png" ){
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Seleccione una imagen JPG/PNG'
              });
            this.form.controls['RealImg'].setValue("");
        }else{
            
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.form.controls['imageInput'].setValue({
                    filename: file.name,
                    filetype: file.type,
                    value: reader.result.split(',')[1]
                });
            };
            this.form.controls['imageInput'].setValue(file ? file : '');
            this.form.controls['idUsuario'].setValue(JSON.parse(localStorage.getItem("UserData")).usu_id);
            if( file.type == "image/jpeg" ){
                var str = file.name;
                var ext = '.' + str.split('.').pop();
                this.form.controls['typeImg'].setValue(1);
                this.form.controls["tipoImgtxt"].setValue(ext);
            }else{
                var str = file.name;
                var ext = '.' + str.split('.').pop();
                this.form.controls['typeImg'].setValue(2);
                this.form.controls["tipoImgtxt"].setValue(ext);
            }
        }   
    }

    savePromocion() {
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
                this.form.controls["rutaSavetxt"].setValue(this.rutaSave);
                this.form.controls["prefijotxt"].setValue(this.prefijo);
                console.log(this.form)
                this._Promoservice.savePromocion( this.form )
                .subscribe( serverResponse => {
                    swal(
                        'Guardado',
                        'Se guardo la promción con éxito.',
                        'success'
                    );
                    this.serverResponse = serverResponse;
                    this.getTablaPromociones();
                },
                error => this.errorMessage = <any>error );
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                'No se guardo la promoción',
                'error'
              );
            }
        });
    };

    updatePromocion(promoid){
        swal({
            title: '¿Desea actualizar la promoción?',
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
                this.form.controls["rutaSavetxt"].setValue(this.rutaSave);
                this.form.controls["prefijotxt"].setValue(this.prefijo);
                this._Promoservice.UpdatePromocion(this.form)
                .subscribe( serverResponse => {
                    this.ModalImg = this.rutaGet + this.prefijo + this.form.value.promoId + this.form.value.tipoImgtxt;
                    console.log(this.ModalImg);
                    this.getTablaPromociones();
                    swal(
                        'Guardado',
                        'Se actualizo la promoción.',
                        'success'
                    );
                },
                error => this.errorMessage = <any>error );
            } else if (result.dismiss === 'cancel') {
              swal(
                'Cancelado',
                'No se actualizo la promoción.',
                'error'
              )
            }
        });
    }

    deletePromocion(promoId){
        swal({
            title: '¿Desea eliminar la promocón?',
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
                this._Promoservice.deletePromocion({ promoId: promoId })
                .subscribe( serverResponse => {
                    swal(
                        'Eliminado!',
                        'Se elimino la proción con éxito.',
                        'success'
                        );
                this.serverResponse = serverResponse;
                this.getTablaPromociones();
                },
                error => this.errorMessage = <any>error );
            } else if (result.dismiss === 'cancel') {
                swal(
                    'Cancelado',
                    'No se elimino la promoción.',
                    'error'
                );
            }
        })
    }

    //================================================================= M O D A L E S =================================================//

  //========= MODAL INSERT ========//
    open(content, algo) {
        this.modalService.open( content, { 
            size: "lg" } );
            this.getTablaPromociones();
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    //========= MODAL UPDATE ========//
    openU(contentU, promoId, img) {
        this.getParametros("PROMOCION");
        this.modalService.open( contentU, {  size: "lg" });
        this._Promoservice.GetPromocion_ById({ promoId: promoId })
        .subscribe( resultadoPromocionesById => {
            this.resultadoPromocionesById = resultadoPromocionesById;
            console.log("Update",this.resultadoPromocionesById);
            this.onChangeEmpresa( this.resultadoPromocionesById[0].po_idEmpresa );
            this.form.controls["SelectTipoPromocion"].setValue(this.resultadoPromocionesById[0].po_IdTipoPromocion);
            this.form.controls["SelectEmpresa"].setValue(this.resultadoPromocionesById[0].po_idEmpresa);
            this.form.controls["SelectSucursal"].setValue(this.resultadoPromocionesById[0].po_IdSucursal);
            this.form.controls["SelectMarca"].setValue(this.resultadoPromocionesById[0].po_IdMarca);
            this.form.controls["TxtDescripcion"].setValue(this.resultadoPromocionesById[0].po_Descripcion);
            this.form.controls["promoId"].setValue(this.resultadoPromocionesById[0].po_IdPromocion);
            this.ModalImg = img;
        },
        error => this.errorMessage = <any>error );
    }

    private getDismissReasonU(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
}
