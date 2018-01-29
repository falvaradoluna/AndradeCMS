import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
//Importacion de las interfaces
import { IEmpresas } from "./empresas";
import { IMarca } from "../promociones/marca";
import { ISucursal } from "../promociones/sucursal";

@Injectable()
export class EmpresaService {
    //constantes para las rutas de las peticiones a las apis
    private _urlEmpresas        = "api/empresa/empresa";
    private _urlMarca           = "api/empresa/marca";
    private _urlSucursal        = "api/empresa/sucursal";

    constructor( private _http: HttpClient ) { }

    getEmpresas(): Observable<IEmpresas[]>{
        //Inicializamos un nuevo onjeto de tipo HttpParams
        let Params = new HttpParams();

        return this._http.get<IEmpresas[]>(this._urlEmpresas, {params: Params})
        .catch(this.handleError);
    }

    GetSucursalBy_empId(parameters): Observable<ISucursal[]>{
        
        let Params = new HttpParams();
        Params = Params.append("empId", parameters.empId);

        return this._http.get<ISucursal[]>(this._urlSucursal, {params: Params})
        .catch( this.handleError );
    }

    GetMarcaBy_empId(parameters): Observable<IMarca[]>{
        
        let Params = new HttpParams();
        Params = Params.append("empId", parameters.empId);

        return this._http.get<IMarca[]>(this._urlMarca, {params: Params})
        .catch( this.handleError );
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

}
