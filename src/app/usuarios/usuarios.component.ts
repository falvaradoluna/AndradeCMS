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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import  swal  from "sweetalert2";
import { PromocionesService } from "../promociones/promociones.service";
import { IEmpresas } from "../promociones/empresas";
import { ISucursal } from "../promociones/sucursal";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  animations: [routerTransition()]
})
export class UsuariosComponent implements OnInit {

    errorMessage: any;
    public data: Object;
    public temp_var: Object = false;
    public resultadoPuestos: any;

    usu_id:   any;
    CorreoId: any

    formInsUsu: FormGroup;
    formUpUsu:  FormGroup;
    TxtNombre       = new FormControl("", Validators.required);
    TxtApellidoM    = new FormControl("", Validators.required);
    TxtApellidoP    = new FormControl("", Validators.required);
    SelectEmpresa   = new FormControl(0, Validators.required);
    SelectPuesto    = new FormControl(0, Validators.required);
    SelectSucursal  = new FormControl(0, Validators.required);
    TxtCorreo       = new FormControl("", Validators.required);
    TxtPass         = new FormControl("", Validators.required);

    resultadoEmpresas: IEmpresas[] = [];
    resultadoSucursal: ISucursal[] = [];

  constructor(  private _Promoservice: PromocionesService,
                private modalService: NgbModal,     
                public fb: FormBuilder, 
                private _http: HttpClient) {
                this.formInsUsu = fb.group({
                    "SelectPuesto":     this.SelectPuesto,
                    "SelectEmpresa":    this.SelectEmpresa,
                    "SelectSucursal":   this.SelectSucursal,
                    "TxtPass":          this.TxtPass,
                    "TxtCorreo":        this.TxtCorreo,
                    "TxtNombre":        this.TxtNombre,
                    "TxtApellidoM":     this.TxtApellidoM,
                    "TxtApellidoP":     this.TxtApellidoP
                });

                this.formUpUsu = fb.group({
                    "SelectPuesto":     this.SelectPuesto,
                    "SelectEmpresa":    this.SelectEmpresa,
                    "SelectSucursal":   this.SelectSucursal,
                    "TxtPass":          this.TxtPass,
                    "TxtCorreo":        this.TxtCorreo,
                    "TxtNombre":        this.TxtNombre,
                    "TxtApellidoM":     this.TxtApellidoM,
                    "TxtApellidoP":     this.TxtApellidoP
                });
               }

    //Constatntes para conexion a las apis
    private _urlUsuario     = "api/usuarios/usuarios";
    private _urlPuesto      = "api/usuarios/puestos";
    private _urlInsertUsu   = "api/usuarios/insertusuario";
    private _urlDeleteUsu   = "api/usuarios/delete";
    private _urlGetUsuById  = "api/usuarios/getusubyid";
    private _urlUpdUsuario  = "api/usuarios/updateusuario";

  ngOnInit() {
      this.getUsuarios();
  }

    getUsuarios(){
        this._http.get(this._urlUsuario).subscribe((res: Response) => {
        this.data = res;
        this.temp_var = true;
        });
    }

    getEmpresas(): void{
        this._Promoservice.getEmpresas()
        .subscribe( resultadoEmpresas => {
            this.resultadoEmpresas = resultadoEmpresas;
        },
        error => this.errorMessage = <any>error);
    }

    onChangeEmpresa(newValueEmp: number): void {
        this.SelectSucursal = new FormControl(0);
        this.GetSucursalBy_empId(newValueEmp);
    }

    GetSucursalBy_empId(empId){
        this._Promoservice.GetSucursalBy_empId({ empId: empId })
        .subscribe( resultadoSucursal => {
            this.resultadoSucursal = resultadoSucursal;
        },
        error => this.errorMessage = <any>error );
    }

    GetPuestos(){
        this._http.get(this._urlPuesto).subscribe((res: Response) => {
            this.resultadoPuestos = res;
        });
    }

    saveUsuario(){
        // if(!this.validar_email(this.formInsUsu.value.TxtCorreo)){   
        //     swal(
        //         'Alto',
        //         'Ingresa una cuenta de correo valida.',
        //         'warning'
        //     );
        // }else if(!this.validar_pass(this.formInsUsu.value.TxtPass)){
        //     swal(
        //         'Alto',
        //         'La contraseña debe contener minimo 8 caracteres, minúsculas, mayúsculas y 1 caracter "$ _ -" ',
        //         'warning'
        //     );
        // }else{
            let Params = new HttpParams();
            Params = Params.append("usu_nombre",    this.formInsUsu.value.TxtNombre);
            Params = Params.append("usu_apellidoP", this.formInsUsu.value.TxtApellidoP);
            Params = Params.append("usu_apellidoM", this.formInsUsu.value.TxtApellidoM);
            Params = Params.append("usu_puesto",    this.formInsUsu.value.SelectPuesto);
            Params = Params.append("usu_empresa",   this.formInsUsu.value.SelectEmpresa);
            Params = Params.append("usu_sucursal",  this.formInsUsu.value.SelectSucursal);
            Params = Params.append("usu_correo",    this.formInsUsu.value.TxtCorreo);
            Params = Params.append("usu_Pass",      this.formInsUsu.value.TxtPass);
            console.log("Parametros", Params)
            console.log("Formulario", this.formInsUsu);
            this._http.get(this._urlInsertUsu, {params: Params}).subscribe((res: Response) => {
                if( res[0].success == 1 ){
                    swal(
                        'Listo',
                        res[0].msg,
                        'success'
                    );
                }else{
                    swal(
                        'Error',
                        res[0].msg,
                        'error'
                    );
                }
            });
        //}
    }

    updateUsuario(){
        // if(!this.validar_email(this.formUpUsu.value.TxtCorreo)){   
        //     swal(
        //         'Alto',
        //         'Ingresa una cuenta de correo valida.',
        //         'warning'
        //     );
        // }else{
            let Params = new HttpParams();
            Params = Params.append("usu_nombre",    this.formUpUsu.value.TxtNombre);
            Params = Params.append("usu_apellidoP", this.formUpUsu.value.TxtApellidoP);
            Params = Params.append("usu_apellidoM", this.formUpUsu.value.TxtApellidoM);
            Params = Params.append("usu_puesto",    this.formUpUsu.value.SelectPuesto);
            Params = Params.append("usu_empresa",   this.formUpUsu.value.SelectEmpresa);
            Params = Params.append("usu_sucursal",  this.formUpUsu.value.SelectSucursal);
            Params = Params.append("usu_correo",    this.formUpUsu.value.TxtCorreo);
            Params = Params.append("CorreoId",      this.CorreoId);
            Params = Params.append("usu_id",        this.usu_id);
            //console.log( this.formUpUsu.value );
            this._http.get(this._urlUpdUsuario, {params: Params}).subscribe((res: Response) => {
                if( res[0].success == 1 ){
                    swal(
                        'Listo',
                        res[0].msg,
                        'success'
                    );
                    this.getUsuarios();
                }else{
                    swal(
                        'Error',
                        res[0].msg,
                        'error'
                    );
                }
            });
        //}
    };

    validar_email( email ){
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email) ? true : false;
    }

    validar_pass( pass ){
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])([A-Za-z\d$@$!%*?&_-]|[^ ]){8,15}$/;
        return regex.test(pass) ? true : false;
    }

    deleteUser(usu_id){
        swal({
            title: 'Desea eliminar el usuario?',
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
                var deletes = "Update [dbo].[Usuario] SET usu_Estatus = 0 WHERE usu_Id = " + usu_id ;
                let Params = new HttpParams();
                Params = Params.append("deletes", deletes);
                this._http.get(this._urlDeleteUsu, {params: Params}).subscribe(data => {
                    swal(
                        'Guardado',
                        'Se elimino el usuario con éxito.',
                        'success'
                      );
                    this.getUsuarios();
                });
            } else if (result.dismiss === 'cancel') {
              swal(
                'Canelado',
                'No se elimino el usuario.',
                'error'
              );
            }
        });
    }

  //=======================================================M O D A L E S=====================================//

    //========= MODAL INSERT TIPO UNIDAD ========//
    openInsUs(InserUser){
        this.modalService.open( InserUser, { size: "lg" } );
        this.getEmpresas();
        this.GetPuestos();
    }

    private getDismissReasonInsUs(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    //========= MODAL UPDATE TIPO UNIDAD ========//
    openUpUs(UpdateUser, usu_id, CorreoId){
        this.modalService.open( UpdateUser, { size: "lg" } );
        this.CorreoId   = CorreoId;
        this.usu_id     = usu_id
        let Params = new HttpParams();
        Params = Params.append("usu_id", usu_id);
        this.getEmpresas();
        this.GetPuestos();
        
        this._http.get(this._urlGetUsuById, {params: Params}).subscribe(data => {
            this.GetSucursalBy_empId(data[0].em_IdEmpresa);
            this.formUpUsu = this.fb.group({
                "SelectPuesto":     data[0].pu_IdPuesto,
                "SelectEmpresa":    data[0].em_IdEmpresa,
                "SelectSucursal":   data[0].su_IdSucursal,
                "TxtPass":          data[0].CorreoClave,
                "TxtCorreo":        data[0].CorreoDireccion,
                "TxtNombre":        data[0].usu_Nombre,
                "TxtApellidoM":     data[0].usu_ApellidoMaterno,
                "TxtApellidoP":     data[0].usu_ApellidoPaterno
            });
        });
    }

    private getDismissReasonUpUs(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

}
