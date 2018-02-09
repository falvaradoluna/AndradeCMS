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
import { CatunidadService } from "./catunidad.service";
import { ICatImg } from "./catimagenes";
import { IServerResponse } from "../promociones/ServerResponse";
import { ICatFichas } from "./catfichas";

@Component({
  selector: 'app-catunidad',
  templateUrl: './catunidad.component.html',
  styleUrls: ['./catunidad.component.scss'],
  animations: [routerTransition()]
})
export class CatunidadComponent implements OnInit {

    public errorMessage: any;
    public data :       object;
    public temp_var:    Object = false;
    public img_var:     Object = false;
    ci_IdCatUnidad:     any;
    showFicha:          number;
    rutaFicha:          any;
    showIcono:          any;
    cafIdCatUnidad:     any;
    fichaId:            any;

    //Formulario de la imagen
    formImg: FormGroup;
    RealImg = new FormControl("");
    imageInput = new FormControl("");
    IdCatUnidad = new FormControl("");
    tipoImg = new FormControl("");
    Idimg = new FormControl("");

    //Formulario
    formFicha: FormGroup;
    RealFicha = new FormControl("");
    FichaInput = new FormControl("");
    caf_idCatUnidad = new FormControl("");
    tipo = new FormControl("");
    idFicha = new FormControl("");

    constructor(private _http: HttpClient, private modalService: NgbModal, private _serviceUnidad: CatunidadService, public fb: FormBuilder) { 
        this.formImg = fb.group({
            "RealImg":      this.RealImg,
            "imageInput":   this.imageInput,
            "IdCatUnidad":  this.IdCatUnidad,
            "tipoImg":      this.tipoImg,
            "Idimg":        this.Idimg
        });

        this.formFicha = fb.group({
            "RealFicha":        this.RealFicha,
            "FichaInput":       this.FichaInput,
            "caf_idCatUnidad":  this.caf_idCatUnidad,
            "tipo":             this.tipo,
            "idFicha":          this.idFicha
        })
    }

    private _urlgetUnidades = "api/catunidad/unidadesnuevas";

    resImganes:     ICatImg[] = [];
    serverResponse: IServerResponse[] = [];
    resFichas:      ICatFichas[] = [];

    ngOnInit() {
        this.getUnidades();
    }

    getUnidades(){
        this._http.get(this._urlgetUnidades).subscribe((res: Response) => {
            this.data = res;
            this.temp_var = true;
          });
    };

    getImages(ci_IdCatUnidad){
        this._serviceUnidad.GetImgsUnidad( { ci_IdCatUnidad: ci_IdCatUnidad } )
        .subscribe( resImganes => {
            this.img_var = true;
            this.resImganes = resImganes;
            this.resImganes.forEach(function( item, key ){
                item.ci_RutaImagen = 'http://localhost:3420/images/' + item.ci_RutaImagen;
            });
            console.log( this.resImganes );
            console.log( "ID de la unidad", this.ci_IdCatUnidad );
        },
        error => this.errorMessage = <any>error);
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
            this.formImg.controls['IdCatUnidad'].setValue(this.ci_IdCatUnidad);
            if( file.type == "image/jpeg" ){
                this.formImg.controls['tipoImg'].setValue(1);
            }else{
                this.formImg.controls['tipoImg'].setValue(2);
            }
            console.log( "ID de la unidad en el onchange", this.ci_IdCatUnidad );
            console.log( "ID del form", this.formImg.value.IdCatUnidad );
        }   
    }

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
                console.log( this.formImg );
                this._serviceUnidad.saveImagen( this.formImg )
                .subscribe( serverResponse => {
                    swal(
                        'Guardado',
                        'Se guardo la promción con éxito.',
                        'success'
                    );
                    this.serverResponse = serverResponse;
                    this.getImages(this.ci_IdCatUnidad);
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

    onFileChangeUp($event, ci_IdImagen, ci_IdCatUnidad) {
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
                this.formImg.controls['tipoImg'].setValue(1);
            }else{
                this.formImg.controls['tipoImg'].setValue(2);
            }
        }   
    };

    updateImage(ci_IdImagen, ci_IdCatUnidad){
        this.formImg.controls['RealImg'].setValue("");
        this.formImg.controls['IdCatUnidad'].setValue(ci_IdCatUnidad);
        this.formImg.controls['Idimg'].setValue(ci_IdImagen);
        swal({
            title: 'Actualizar la imagen?',
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
                this._serviceUnidad.updateImagen( this.formImg )
                .subscribe( serverResponse => {
                    swal(
                        'Guardado',
                        'Se actualizo la imagen con éxito.',
                        'success'
                    );
                    this.serverResponse = serverResponse;
                    this.getImages(ci_IdCatUnidad);
                },
                error => this.errorMessage = <any>error );
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                'No se azrualizo la imagen.',
                'error'
              );
            }
        });
    };

    getFichas(caf_IdCatUnidad){
        this.resFichas = [];
        this.rutaFicha = "";

        this._serviceUnidad.GetFichasUnidad( { caf_IdCatUnidad: caf_IdCatUnidad } )
        .subscribe( resFichas => {
            this.resFichas = resFichas
            this.resFichas.forEach(function( item, key ){
                item.caf_RutaFicha = 'http://localhost:3420/fichas/' + item.caf_RutaFicha;
            });
            
            if(this.resFichas[0] == undefined){
                this.showFicha = 0;
            }else{
                this.showFicha = 1;
                this.rutaFicha = this.resFichas[0].caf_RutaFicha;
                console.log(this.resFichas[0]);
                this.fichaId = this.resFichas[0].caf_idFicha;
            }
        },
        error => this.errorMessage = <any>error);
    };

    onFileChangeFicha($event) {
        let reader = new FileReader();
        let file = $event.target.files[0];
        console.log( file );
        if( file.type != "application/pdf" ){
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Seleccione una archivo PDF.'
              });
            this.formFicha.controls['RealFicha'].setValue("");
        }else{
            this.formFicha.controls['tipo'].setValue(3);
            this.formFicha.controls["caf_idCatUnidad"].setValue(this.cafIdCatUnidad);
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.formFicha.controls['FichaInput'].setValue({
                    filename: file.name,
                    filetype: file.type,
                    value: reader.result.split(',')[1]
                });
            };
            this.formFicha.controls['FichaInput'].setValue(file ? file : '');
        }   
    };

    saveFicha(){
        console.log( this.formFicha );
        if(this.showFicha == 0){
            var txtTitle    = "¿Guardar la ficha?";
            var txtButton   = "Guardar";
            var txtMsgDone  = "Se guardo la ficha con éxito.";
            var txtMsgErr   = "No se guardo la ficha con éxito.";
        }else if(this.showFicha == 1){
            var txtTitle    = "Actualizar la ficha?";
            var txtButton   = "Actualizar";
            var txtMsgDone  = "Se actualizo la ficha con éxito.";
            var txtMsgErr   = "No se actualizo la ficha con éxito.";
        }
        swal({
            title: txtTitle,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: txtButton,
            cancelButtonText: 'Cancelar',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
        }).then((result) => {
            if (result.value) {
                console.log( this.formFicha );
                this._serviceUnidad.saveFicha( this.formFicha )
                .subscribe( serverResponse => {
                    swal(
                        'Guardado',
                        txtMsgDone,
                        'success'
                    );
                    this.serverResponse = serverResponse;
                    this.getFichas(this.cafIdCatUnidad);
                },
                error => this.errorMessage = <any>error );
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                txtMsgErr,
                'error'
              );
            }
        });
    };

    updateFicha(){
        this.formFicha.controls["idFicha"].setValue(this.fichaId);
        swal({
            title: "¿Actualizar la ficha?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Actualizar",
            cancelButtonText: 'Cancelar',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
        }).then((result) => {
            if (result.value) {
                // console.log( "FormUpdate", this.formFicha );
                this._serviceUnidad.updateFicha( this.formFicha )
                .subscribe( serverResponse => {
                    swal(
                        'Guardado',
                        "Se actualizo la ficha con éxito.",
                        'success'
                    );
                    this.serverResponse = serverResponse;
                    this.getFichas(this.cafIdCatUnidad);
                },
                error => this.errorMessage = <any>error );
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                "No se actualizo la ficha.",
                'error'
              );
            }
        });
    };

    deleteImage( ci_IdImagen, ci_IdCatUnidad ){
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
                console.log( "Id de la imagen", ci_IdImagen );
                console.log( "Id del seminuevo", ci_IdCatUnidad );
                this._serviceUnidad.DeleteImgs( {ci_IdCatUnidad:ci_IdCatUnidad, ci_IdImagen:ci_IdImagen} )
                .subscribe( serverResponse => {
                    swal(
                        'Desactivada',
                        'Se desactivo la imagen con éxito.',
                        'success'
                    );
                    this.serverResponse = serverResponse;
                    this.getImages(ci_IdCatUnidad);
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

    deleteFicha( ci_IdImagen, ci_IdCatUnidad ){
        swal({
            title: '¿Desactivar la ficha?',
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
                console.log( "Id de la ficha", this.fichaId );
                console.log( "Id del unidad", this.cafIdCatUnidad );
                this._serviceUnidad.deleteFicha( {caf_idFicha: this.fichaId, caf_idCatUnidad: this.cafIdCatUnidad} )
                .subscribe( serverResponse => {
                    swal(
                        'Desactivada',
                        'Se desactivo la imagen con éxito.',
                        'success'
                    );
                    this.serverResponse = serverResponse;
                    this.getFichas(this.cafIdCatUnidad);
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

    //================================================================= M O D A L E S =================================================//

    //========= MODAL INSERT ========//
    openImgModal(ModalImg, ci_IdCatUnidad) {
        this.modalService.open( ModalImg, { size: "lg" } );
        console.log( "Id de la unidad", ci_IdCatUnidad );
        this.getImages(ci_IdCatUnidad);
        this.ci_IdCatUnidad = ci_IdCatUnidad;
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

    //========= MODAL INSERT FICHA ========//
    openFichaModal(ModalFicha, caf_IdCatUnidad) {
        this.cafIdCatUnidad = 0;
        this.modalService.open( ModalFicha);
        console.log( "Id de la unidad", caf_IdCatUnidad );
        this.getFichas(caf_IdCatUnidad);
        this.cafIdCatUnidad = caf_IdCatUnidad;
        //this.ci_IdCatUnidad = ci_IdCatUnidad;
    }

    private getDismissReasonFicha(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

}
