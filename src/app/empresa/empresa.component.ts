import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';
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
import { EmpresaService } from "./empresa.service";

//Interfaces para recoger los datos
import { IEmpresas } from "./empresas";
import { IMarca } from "../promociones/marca";
import { ISucursal } from "../promociones/sucursal";

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.component.html',
    styleUrls: ['./empresa.component.scss'],
    animations: [routerTransition()]
})

export class EmpresaComponent implements OnInit {
    errorMessage:   any;
    Selectdiv:      number;
    usuRol :        number;
    getUrl:         string;
    dtOptions: DataTables.Settings = {};
    public data: Object;
    public temp_var: Object=false;

    //Formularios
    EmpInsForm: FormGroup;
    SelectTipoPromocion = new FormControl("", Validators.required);

    constructor( private _EmpService: EmpresaService, 
                private modalService: NgbModal, 
                public fb: FormBuilder, 
                private router: Router,
                private _http: HttpClient ) {
        this.EmpInsForm = fb.group({
            "SelectTipoPromocion": this.SelectTipoPromocion
        });
     }

    //Constantes para cahcar los datos de las interfaces
    resultadoMarca:    IMarca[] = [];
    resultadoSucursal: ISucursal[] = [];

    ngOnInit() {
        this.getTablaPromociones();
        this.getUrl = this.router.url;
        var array = this.getUrl.split('/');
        console.log(array[2]);
        if( array[2] == "empresa" ){
            this.Selectdiv = 1
            this.getEmpresas()
        }else if( array[2] == "sucursales" ){
            this.Selectdiv = 2;
            this.getSucursales();
        }else if( array[2] == "marcas" ){
            this.Selectdiv = 3;
            this.getMarcas();
        }
        this.usuRol = JSON.parse(localStorage.getItem("UserData")).usu_rol;
    }

    getTablaPromociones(){
        this._http.get('api/promociones/promociones').subscribe((res: Response) => {
        this.data = res;
        this.temp_var = true;
      });
    }

    GetSucursalBy_empId(empId){
        this._EmpService.GetSucursalBy_empId({ empId: empId })
        .subscribe( resultadoSucursal => {
            this.resultadoSucursal = resultadoSucursal;
        },
        error => this.errorMessage = <any>error );
    }

    GetMarcaBy_empId(empId){
        this._EmpService.GetMarcaBy_empId({ empId: empId })
        .subscribe( resultadoMarca => {
            this.resultadoMarca = resultadoMarca;
        },
        error => this.errorMessage = <any>error );
    }

    //========================================== D A T A T A B L E ===========================================//
    getEmpresas(){
        this._http.get('api/empresa/empresa').subscribe((res: Response) => {
        this.data = res;
        this.temp_var = true;
      });
    }

    getSucursales(){
        this._http.get('api/empresa/sucursales').subscribe((res: Response) => {
        this.data = res;
        this.temp_var = true;
      });
    }

    getMarcas(){
        this._http.get('api/empresa/marcas').subscribe((res: Response) => {
        this.data = res;
        this.temp_var = true;
      });
    }

    //========================================== D A T A T A B L E ===========================================//

    //================================================================= M O D A L E S =================================================//

  //========= MODAL INSERT ========//
  open(InsEmpModal) {
    this.modalService.open( InsEmpModal, { 
        size: "lg" } );
        //this.getTablaPromociones();
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
