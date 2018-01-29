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

//Service
import { TipounidadService } from "./tipounidad.service";

@Component({
  selector: 'app-tipounidad',
  templateUrl: './tipounidad.component.html',
  styleUrls: ['./tipounidad.component.scss'],
  animations: [routerTransition()]
})
export class TipounidadComponent implements OnInit {

    resultadosTipo : any;
    cabecerasTipo : any;
    cabeceras:any[]=[];
    items:any[]=[];
    getUrl: string;
    tableBody: number;
  constructor(private _http: HttpClient, private router: Router) { }

  //Peticiones URL
  private _urlTUnidad = "api/tipo/tipounidad";

    ngOnInit() {
        this.getUrl = this.router.url;
        var array = this.getUrl.split('/');
        console.log(array[2]);

        if( array[2] === "tipounidad" ){
            this.tableBody = 1;
            this.getTipo(`SELECT tu_Descripcion FROM TipoUnidad`);
        }else if( array[2] === "moneda" ){
            this.tableBody = 2;
            this.getTipo(`SELECT TOP (100) cu_IdCatUnidad ,cu_IdEmpresa,cu_IdMarca,cu_IdCarline,cu_Catalogo,cu_Modelo,cu_Descripcion,cu_Marca,cu_MarcaNombre,cu_IdTIpo,cu_CveClasif,cu_CveSubClasif,cu_CveCombustible,cu_CveTransmision,cu_CveMotor,cu_CveMoneda,cu_ClaveVehicular,cu_Puertas,cu_Cilindros,cu_Potencia,cu_Capacidad,cu_PrecioBase,cu_PrecioLista FROM GA_WebAndrade.dbo.CatalogoUnidades`);
        }
    }

    getTipo( table ){
        let Params = new HttpParams();
        Params = Params.append("table", table);
        this._http.get(this._urlTUnidad, {params: Params}).subscribe(data => {
            this.resultadosTipo = data;
            this.cabecerasTipo = data[0];
            for (var key in this.cabecerasTipo) {
                console.log( key );
                this.cabeceras.push( this.parseTitle( key ) );
                this.items.push( key );
            }
            console.log( "items", this.items );
          });
    }

    parseTitle( campo ){
        // var campo    = 'cp_nombreCampo';
        var array    = campo.split('_');
        var capital1 = array[1].substring(0, 1);
        var capital2 = array[1].substring(0, 1).toUpperCase();
        var nombre   = array[1].replace( capital1, capital2 );
        return nombre.match(/[A-Z][a-z]+/g).join(' ');
    }

}
