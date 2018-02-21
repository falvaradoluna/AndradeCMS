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
import { SeminuevoService } from './seminuevo.service';
import { ISemImg } from "./semimg";
import { IServerResponse } from "../promociones/ServerResponse";
import { CatunidadService } from "../catunidad/catunidad.service";
import { IParametros } from "../catunidad/parametros";
import { ICatAtributosSem } from "./satributo";

@Component({
  selector: 'app-seminuevo',
  templateUrl: './seminuevo.component.html',
  styleUrls: ['./seminuevo.component.scss'],
  animations: [routerTransition()]
})
export class SeminuevoComponent implements OnInit {

  public errorMessage:  any;
  public data :         object;
  public img_var:       Object = false;
  public temp_var:      Object = false;
  public atr_var:       Object = false;
  cis_IdSeminuevo:      any;
  imgLength:            any;
  showAddAtributo:      any;
  ctseidAtributo:       any;
  isIdSeminuevo:        any;

  //Formulario de la imagen
  formImg: FormGroup;
  RealImg       = new FormControl("");
  imageInput    = new FormControl("");
  IdSemi        = new FormControl("");
  tipoImg       = new FormControl("");
  Idimg         = new FormControl("");
  tipoImgtxt    = new FormControl("");
  rutaTxt       = new FormControl("");
  prefijoTxt    = new FormControl("");

  //Formulario Atributos
  formAtributo: FormGroup;
  Atributo      = new FormControl("");
  
  //Variables de parametros;
  prefijo:    any;
  rutaSave:   any;
  rutaGet:    any;
  limitImg:   any;
  limitAtr:   any;
  atrLength:  any;

  constructor(private _http: HttpClient, private modalService: NgbModal, public fb: FormBuilder, private _semiService: SeminuevoService, private _serviceUnidad: CatunidadService) {
    this.formImg = fb.group({
        "RealImg":      this.RealImg,
        "imageInput":   this.imageInput,
        "IdSemi":       this.IdSemi,
        "tipoImg":      this.tipoImg,
        "Idimg":        this.Idimg,
        "tipoImgtxt":   this.tipoImgtxt,
        "rutaTxt":      this.rutaTxt,
        "prefijoTxt":   this.prefijoTxt
    });

    this.formAtributo = fb.group({
        "Atributo": this.Atributo
    });
   }

   resImganes:      ISemImg[] = [];
   serverResponse:  IServerResponse[] = [];
   resParametros:   IParametros[] = [];
   resAtributos:    ICatAtributosSem[] = [];


  private _urlSeminuevo     = "api/seminuevo/seminuevo";
  private _urlGetAtrById    = "api/seminuevo/getatributobyid";

  ngOnInit() {
    this.getSeminuevo();
    this.getParametros("SEMINUEVO")
  }

  getParametros(recurso){
    this._serviceUnidad.GetParametros( { recurso: recurso } )
    .subscribe( resParametros => {
        this.resParametros = resParametros;
        if( recurso == "ATRIBUTO_SEMI" ){
            if( this.resParametros[0].pr_TipoParametro == "LIMIT" ){
                this.limitAtr = this.resParametros[0].pr_ValorString1;
            }
        }else{
            if( this.resParametros[0].pr_TipoParametro == "PREFIJO" ){
                this.prefijo = this.resParametros[0].pr_ValorString1;
            }
            if(this.resParametros[1].pr_TipoParametro == "RUTASAVE"){
                this.rutaSave = this.resParametros[1].pr_ValorString1;
            }
            if(this.resParametros[2].pr_TipoParametro == "RUTAGET"){
                this.rutaGet = this.resParametros[2].pr_ValorString1;
            }
            if(this.resParametros[3].pr_TipoParametro == "LIMIT"){
                this.limitImg = this.resParametros[3].pr_ValorString1
            }
        }

        // console.log( "Atributo", this.limitAtr );
        // console.log("LIMITPA", this.limitImg);
        // console.log("PrefijoPA", this.prefijo);
        // console.log("RUTASAVEPA", this.rutaSave);
        // console.log("RUTAGETPA", this.rutaGet);
    },
    error => this.errorMessage = <any>error);
};

  getSeminuevo(){
    this._http.get(this._urlSeminuevo).subscribe((res: Response) => {
        this.data = res;
        this.temp_var = true;
      });
  };

    getImages(cis_IdSeminuevo){
        this._semiService.GetImgsSemi( { cis_IdSeminuevo: cis_IdSeminuevo } )
        .subscribe( resImganes => {
            this.img_var = true;
            this.resImganes = resImganes;
            var getRuta = this.rutaGet;
            var prefijillo = this.prefijo;
            this.resImganes.forEach(function( item, key ){
                item.pathImagen = getRuta + prefijillo + item.cis_IdSeminuevo + "_" + item.cis_ConsImg + item.ti_Nombre;
            });
            this.imgLength = this.resImganes.length;
            console.log( "LenghtImg", this.imgLength);
        },
        error => this.errorMessage = <any>error);
    };

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
            this.formImg.controls['RealImg'].setValue("");
        }else{
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.formImg.controls['imageInput'].setValue({
                    filename: file.name,
                    filetype: file.type,
                    value: reader.result.split(',')[1]
                });
            };
            this.formImg.controls['imageInput'].setValue(file ? file : '');
            this.formImg.controls['IdSemi'].setValue(this.cis_IdSeminuevo);
            if( file.type == "image/jpeg" ){
                var str = file.name;
                var ext = '.' + str.split('.').pop();
                console.log(ext);
                this.formImg.controls["tipoImgtxt"].setValue(ext);
                this.formImg.controls['tipoImg'].setValue(1);
            }else{
                var str = file.name;
                var ext = '.' + str.split('.').pop();
                console.log(ext);
                this.formImg.controls["tipoImgtxt"].setValue(ext);
                this.formImg.controls['tipoImg'].setValue(2);
            }
            console.log( "ID de la unidad en el onchange", this.cis_IdSeminuevo );
            console.log( "ID del form", this.formImg.value.IdSemi );
        }   
    };

    saveImage() {
        swal({
            title: '¿Guardar la imagen?',
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
                this.formImg.controls["prefijoTxt"].setValue(this.prefijo);
                this.formImg.controls["rutaTxt"].setValue(this.rutaSave);
                console.log( this.formImg );
                if( this.imgLength == this.limitImg ){
                    swal(
                        'Alto',
                        'Solo puedes guardar 5 imágenes.',
                        'error'
                    );
                }else{
                    this._semiService.saveImagenSemi( this.formImg )
                    .subscribe( serverResponse => {
                        swal(
                            'Guardado',
                            'Se guardo la promción con éxito.',
                            'success'
                        );
                        this.formImg.controls['RealImg'].setValue("");
                        this.serverResponse = serverResponse;
                        this.getSeminuevo();
                        this.getImages(this.cis_IdSeminuevo);
                    },
                    error => this.errorMessage = <any>error );
                }
            } else if (result.dismiss === 'cancel') {
                swal(
                    'Canelado',
                    'No se guardo la promoción',
                    'error'
                );
            }
        });
    };

    onFileChangeUp($event) {
        let reader = new FileReader();
        let file = $event.target.files[0]; 
        console.log( file.type );
        if( file.type != "image/jpeg" && file.type != "image/png" ){
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Seleccione una imagen JPG/PNG'
              });
            this.formImg.controls['RealImg'].setValue("");
        }else{
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.formImg.controls['imageInput'].setValue({
                    filename: file.name,
                    filetype: file.type,
                    value: reader.result.split(',')[1]
                });
            };
            this.formImg.controls['imageInput'].setValue(file ? file : '');
            if( file.type == "image/jpeg" ){
                var str = file.name;
                var ext = '.' + str.split('.').pop();
                console.log(ext);
                this.formImg.controls["tipoImgtxt"].setValue(ext);
                this.formImg.controls['tipoImg'].setValue(1);
            }else{
                var str = file.name;
                var ext = '.' + str.split('.').pop();
                console.log(ext);
                this.formImg.controls["tipoImgtxt"].setValue(ext);
                this.formImg.controls['tipoImg'].setValue(2);
            }
        }   
    };

    updateImage(cis_idImagenSemi, cis_IdSeminuevo){
        this.formImg.controls['IdSemi'].setValue(cis_IdSeminuevo);
        this.formImg.controls['Idimg'].setValue(cis_idImagenSemi);
        swal({
            title: '¿Actualizar la imagen?',
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
                this.formImg.controls["prefijoTxt"].setValue(this.prefijo);
                this.formImg.controls["rutaTxt"].setValue(this.rutaSave);
                console.log( "Update",this.formImg );
                this._semiService.updateImagenSemi( this.formImg )
                .subscribe( serverResponse => {
                    swal(
                        'Guardado',
                        'Se actualizo la imagen con éxito.',
                        'success'
                    );
                    this.serverResponse = serverResponse;
                    this.getImages(cis_IdSeminuevo);
                    this.formImg.controls['RealImg'].setValue("");
                    location.reload();
                },
                error => this.errorMessage = <any>error );
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                'No se actualizo la imagen.',
                'error'
              );
            }
        });

    };

    deleteImage( cis_idImagenSemi, cis_IdSeminuevo ){
        swal({
            title: '¿Desactivar la imagen?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Desactivar',
            cancelButtonText: 'Cancelar',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
        }).then((result) => {
            if (result.value) {
                console.log( "Id de la imagen", cis_idImagenSemi );
                console.log( "Id del seminuevo", cis_IdSeminuevo );
                this._semiService.DeleteImgsSemi( {cis_idImagenSemi:cis_idImagenSemi, cis_IdSeminuevo:cis_IdSeminuevo} )
                .subscribe( serverResponse => {
                    swal(
                        'Desactivada',
                        'Se desactivo la imagen con éxito.',
                        'success'
                    );
                    this.serverResponse = serverResponse;
                    this.getImages(cis_IdSeminuevo);
                    this.formImg.controls['RealImg'].setValue("");
                },
                error => this.errorMessage = <any>error );
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                'No se desactivo la imagen.',
                'error'
              );
            }
        });
    };

    addAtributo(showForm){
        this.showAddAtributo = showForm;
        this.formAtributo.controls["Atributo"].setValue("");
    };

    updAtributo(showForm, ctse_idAtributo){
        this.showAddAtributo = showForm;
        this.ctseidAtributo = ctse_idAtributo;
        
        let Params = new HttpParams();
        Params = Params.append("ctse_idAtributo", ctse_idAtributo);
        this._http.get(this._urlGetAtrById, {params: Params}).subscribe((res: Response) => {
            this.formAtributo.controls["Atributo"].setValue(res[0].ctse_Descripcion);
        });
    };

    getAtributos(is_IdSeminuevo){
        this._semiService.GetAtributos( { is_IdSeminuevo: is_IdSeminuevo } )
        .subscribe( resAtributos => {
            this.atr_var = true;
            this.resAtributos = resAtributos;
            this.atrLength = this.resAtributos.length;
            //console.log("Atributos", this.resAtributos);
            //console.log("Arreglo", this.atrLength);
        },
        error => this.errorMessage = <any>error);
    };

    saveAtributos(){
        swal({
            title: '¿Guardar el atributo?',
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
                if(this.atrLength >= this.limitAtr){
                    swal(
                        'Alto',
                        'Solo puedes agregar 5 atributos a la unidad.',
                        'error'
                      );
                }else{
                    var desAtributo = this.formAtributo.value.Atributo;
                    this._semiService.SaveAtributos( {ctse_IdSeminuevo: this.isIdSeminuevo, ctse_Descripcion: desAtributo } )
                    .subscribe( serverResponse => {
                        if( serverResponse[0].success == 1 ){
                            swal(
                                'Guardado',
                                serverResponse[0].msg,
                                'success'
                            );
                            this.serverResponse = serverResponse;
                            this.getAtributos(this.isIdSeminuevo);
                            this.formAtributo.controls["Atributo"].setValue("");
                            this.showAddAtributo = 3;
                        }else{
                            swal(
                                'Ups',
                                serverResponse[0].msg,
                                'error'
                            );
                        }
                        
                    },
                    error => this.errorMessage = <any>error );
                }
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                'No se guardo el atributo.',
                'error'
              );
            }
        });
    };

    updateAtributos(ctse_idAtributo){
        swal({
            title: 'Actualizar el atributo?',
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
                var desAtributo = this.formAtributo.value.Atributo;
                this._semiService.UpdateAtributos( 
                    { 
                        ctse_IdSeminuevo: this.isIdSeminuevo, 
                        ctse_idAtributo: this.ctseidAtributo, 
                        ctse_Descripcion: desAtributo } 
                    )
                .subscribe( serverResponse => {
                    if( serverResponse[0].success == 1 ){
                        swal(
                            'Actualizado',
                            serverResponse[0].msg,
                            'success'
                        );
                        this.serverResponse = serverResponse;
                        this.getAtributos(this.isIdSeminuevo);
                        this.formAtributo.controls["Atributo"].setValue("");
                        this.showAddAtributo = 3;
                    }else{
                        swal(
                            'Ups',
                            serverResponse[0].msg,
                            'error'
                        );
                    }
                    
                },
                error => this.errorMessage = <any>error );
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                'No se actualizo el atributo.',
                'error'
              );
            }
        });
    };

    deleteAtributo(ctseidAtributo){
        swal({
            title: 'Eliminar el atributo?',
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
                this._semiService.DeleteAtributos( 
                    { 
                        ctse_IdSeminuevo: this.isIdSeminuevo, 
                        ctse_idAtributo: ctseidAtributo
                    } )
                .subscribe( serverResponse => {
                    if( serverResponse[0].success == 1 ){
                        swal(
                            'Eliminado',
                            serverResponse[0].msg,
                            'success'
                        );
                        this.serverResponse = serverResponse;
                        this.getAtributos(this.isIdSeminuevo);
                        this.formAtributo.controls["Atributo"].setValue("");
                        this.showAddAtributo = 3;
                    }else{
                        swal(
                            'Ups',
                            serverResponse[0].msg,
                            'error'
                        );
                    }
                    
                },
                error => this.errorMessage = <any>error );
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                'No se elimino el atributo.',
                'error'
              );
            }
        });
    };


  //========= MODAL INSERT ========//
    openImgModal(ModalImg, cis_IdSeminuevo) {
        this.modalService.open( ModalImg, { size: "lg" } );
        console.log( "Id de la unidadsemi", cis_IdSeminuevo );
        this.getImages(cis_IdSeminuevo);
        this.cis_IdSeminuevo = cis_IdSeminuevo;
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

      //========= MODAL Atributos ========//
      openModalAtributos(ModalAtributos, is_IdSeminuevo) {
        this.getParametros("ATRIBUTO_SEMI");
        this.formAtributo.controls["Atributo"].setValue("");
        this.modalService.open( ModalAtributos);
        this.showAddAtributo = 3;
        this.isIdSeminuevo = is_IdSeminuevo;
        this.getAtributos(is_IdSeminuevo);
    }

    private getDismissReasonAtributos(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

}
