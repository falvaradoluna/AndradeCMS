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

@Component({
  selector: 'app-seminuevo',
  templateUrl: './seminuevo.component.html',
  styleUrls: ['./seminuevo.component.scss'],
  animations: [routerTransition()]
})
export class SeminuevoComponent implements OnInit {

  public errorMessage: any;
  public data :       object;
  public img_var:     Object = false;
  public temp_var:    Object = false;
  cis_IdSeminuevo:    any;

  //Formulario de la imagen
  formImg: FormGroup;
  RealImg       = new FormControl("");
  imageInput    = new FormControl("");
  IdSemi        = new FormControl("");
  tipoImg       = new FormControl("");
  Idimg         = new FormControl("");
  tipoImgtxt    = new FormControl("");

  serverPathSemi = 'http://192.168.20.92:3420/imagesSemi/';

  constructor(private _http: HttpClient, private modalService: NgbModal, public fb: FormBuilder, private _semiService: SeminuevoService) {
    this.formImg = fb.group({
        "RealImg":      this.RealImg,
        "imageInput":   this.imageInput,
        "IdSemi":       this.IdSemi,
        "tipoImg":      this.tipoImg,
        "Idimg":        this.Idimg,
        "tipoImgtxt":   this.tipoImgtxt
    });
   }

   resImganes:     ISemImg[] = [];
   serverResponse: IServerResponse[] = [];

  private _urlSeminuevo = "api/seminuevo/seminuevo";

  ngOnInit() {
    this.getSeminuevo();
  }

  getSeminuevo(){
    this._http.get(this._urlSeminuevo).subscribe((res: Response) => {
        this.data = res;
        this.temp_var = true;
        console.log( this.data );
      });
  };

    getImages(cis_IdSeminuevo){
        this._semiService.GetImgsSemi( { cis_IdSeminuevo: cis_IdSeminuevo } )
        .subscribe( resImganes => {
            this.img_var = true;
            this.resImganes = resImganes;
            this.resImganes.forEach(function( item, key ){
                item.cis_RutaImagen = this.serverPathSemi + item.cis_RutaImagen;
            });
            console.log( this.resImganes );
            //console.log( "ID de la unidad", this.ci_IdCatUnidad );
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
                this.formImg.controls['tipoImg'].setValue(1);
            }else{
                this.formImg.controls['tipoImg'].setValue(2);
            }
            console.log( "ID de la unidad en el onchange", this.cis_IdSeminuevo );
            console.log( "ID del form", this.formImg.value.IdSemi );
        }   
    };

    saveImage() {
        console.log( this.formImg );
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
                this._semiService.saveImagenSemi( this.formImg )
                .subscribe( serverResponse => {
                    swal(
                        'Guardado',
                        'Se guardo la promción con éxito.',
                        'success'
                    );
                    this.formImg.controls['RealImg'].setValue("");
                    this.serverResponse = serverResponse;
                    this.getImages(this.cis_IdSeminuevo);
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
                this.formImg.controls['tipoImg'].setValue(1);
            }else{
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

}
