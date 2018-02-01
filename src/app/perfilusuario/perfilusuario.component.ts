import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
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
import  swal  from "sweetalert2";
import { PromocionesService } from "../promociones/promociones.service";
import { IEmpresas } from "../promociones/empresas";
import { ISucursal } from "../promociones/sucursal";

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.component.html',
  styleUrls: ['./perfilusuario.component.scss'],
  animations: [routerTransition()]
})
export class PerfilusuarioComponent implements OnInit {
    errorMessage: any;
    usu_id: any;
    usu_nombre: any;
    CorreoId: any;
    resultadoPuestos: any;

    formUpUsu:  FormGroup;
    TxtNombre       = new FormControl("", Validators.required);
    TxtApellidoM    = new FormControl("", Validators.required);
    TxtApellidoP    = new FormControl("", Validators.required);
    SelectEmpresa   = new FormControl({value: '0', disabled: true}, Validators.required);
    SelectPuesto    = new FormControl({value: '0', disabled: true}, Validators.required);
    SelectSucursal  = new FormControl({value: '0', disabled: true}, Validators.required);
    TxtCorreo       = new FormControl("", Validators.required);
    TxtPass         = new FormControl("", Validators.required);

    changePass: FormGroup;
    PassActual     = new FormControl("", Validators.required);
    PassNuevo      = new FormControl("", Validators.required);
    PassConfirmar  = new FormControl("", Validators.required);

    resultadoEmpresas: IEmpresas[] = [];
    resultadoSucursal: ISucursal[] = [];

  constructor(
    private _http: HttpClient,
    private modalService: NgbModal,     
    public fb: FormBuilder,
    private _Promoservice: PromocionesService) 
    { 
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

        this.changePass = fb.group({
            "PassActual":    this.PassActual,
            "PassNuevo":     this.PassNuevo,
            "PassConfirmar": this.PassConfirmar
        });
    }

  //Constantes para las peticiones a las apis
  private _urlGetUsuById  = "api/usuarios/getusubyid";
  private _urlPuesto      = "api/usuarios/puestos";
  private _urlUpdUsuario  = "api/usuarios/updateusuario";
  private _urlUpdPass     = "api/usuarios/updatepass";      

  ngOnInit() {
    this.usu_id = JSON.parse( localStorage.getItem("UserData") ).usu_id;
    this.getUsuarioById();
    this.getEmpresas();
    this.GetPuestos();
  };

    getUsuarioById(){
        let Params = new HttpParams();
        Params = Params.append("usu_id", this.usu_id);
        this._http.get(this._urlGetUsuById, {params: Params}).subscribe(data => {
            this.usu_nombre = data[0].usu_Nombre + " " + data[0].usu_ApellidoMaterno + " " + data[0].usu_ApellidoPaterno
            this.GetSucursalBy_empId( data[0].em_IdEmpresa );
            this.CorreoId = data[0].usu_CorreoId;
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
    };

    getEmpresas(): void{
        this._Promoservice.getEmpresas()
        .subscribe( resultadoEmpresas => {
            this.resultadoEmpresas = resultadoEmpresas;
        },
        error => this.errorMessage = <any>error);
    };

    onChangeEmpresa(newValueEmp: number): void {
        this.SelectSucursal = new FormControl(0);
        this.GetSucursalBy_empId(newValueEmp);
    };

    GetSucursalBy_empId(empId){
        this._Promoservice.GetSucursalBy_empId({ empId: empId })
        .subscribe( resultadoSucursal => {
            this.resultadoSucursal = resultadoSucursal;
        },
        error => this.errorMessage = <any>error );
    };

    GetPuestos(){
        this._http.get(this._urlPuesto).subscribe((res: Response) => {
            this.resultadoPuestos = res;
        });
    };

    updateUsuario(){
        if(!this.validar_email(this.formUpUsu.value.TxtCorreo)){   
            swal(
                'Alto',
                'Ingresa una cuenta de correo valida.',
                'warning'
            );
        }else{
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
                    swal({
                        title: '¿Desea actualizar sus datos?',
                        //text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Actualizar',
                        cancelButtonText: 'Cancelar',
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger',
                        buttonsStyling: false
                      }).then((result) => {
                        if (result.value) {
                            swal(
                                'Listo',
                                res[0].msg,
                                'success'
                            );
                            this.GetSucursalBy_empId(this.usu_id);
                        } else if (result.dismiss === 'cancel') {
                          swal(
                            'Cancelado',
                            'No se actualizo sus datos.',
                            'error'
                          )
                        }
                      });
                }else{
                    swal(
                        'Error',
                        res[0].msg,
                        'error'
                    );
                }
            });
        }
    };

    updatePass(){
        var Pass        = this.changePass.value.PassActual;
        var newPass     = this.changePass.value.PassNuevo;
        var confirmPass = this.changePass.value.PassConfirmar;
        if( !this.validar_pass( newPass ) ){
            swal(
                'Alto',
                'La contraseña debe contener minimo 8 caracteres, minúsculas, mayúsculas y 1 caracter "$ _ -" ',
                'warning'
            );
        }else if( newPass != confirmPass ){
            swal(
                'Alto',
                'La confirmación de la constraseña no coincide.',
                'warning'
            );
        }else{
            let Params = new HttpParams();
            Params = Params.append("Pass",      Pass);
            Params = Params.append("newPass",   newPass);
            this._http.get(this._urlUpdPass, {params:Params}).subscribe((res: Response) => {
                if( res[0].success == 0 ){
                    swal(
                        'Alto',
                        res[0].msg,
                        'warning'
                    ); 
                }else if( res[0].success == 1 ){
                    swal(
                        'Listo',
                        res[0].msg,
                        'success'
                    );
                }
                console.log( res );
            });
        }
    };

    validar_email( email ){
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email) ? true : false;
    };

    validar_pass( pass ){
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])([A-Za-z\d$@$!%*?&_-]|[^ ]){8,15}$/;
        return regex.test(pass) ? true : false;
    };

    //============================================================= M O D A L E S ===================================================================//
    //========= MODAL UPDATE TIPO UNIDAD ========//
    openChange(changePass){
        this.modalService.open( changePass, { size: "lg" } );
    };
}
