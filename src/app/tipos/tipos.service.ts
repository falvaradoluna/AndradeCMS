import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

//Interfaces
import { IdataSelect } from "./dataSelect";
import { IServerResponse } from "./ServerResponse";


@Injectable()
export class TiposService {

  constructor(private _http: HttpClient) { }

    //URL para las peticiones
    private _urltipos   = "api/tipos/select";
    private _urlInsert  = "api/tipos/insert";
    private _urlDelete  = "api/tipos/delete";
    private _urlById    = "api/tipos/selectbyid"    

    getTable(parameters): Observable<IdataSelect[]>{

        //Inicializamos un nuevo onjeto de tipo HttpParams
        let Params = new HttpParams();
        Params = Params.append("query", parameters.query);

        return this._http.get<IdataSelect[]>(this._urltipos, {params: Params})
        .catch(this.handleError);
    }

    getById(parameters): Observable<IdataSelect[]>{

        //Inicializamos un nuevo onjeto de tipo HttpParams
        let Params = new HttpParams();
        Params = Params.append("clave", parameters.clave);
        if( parameters.use == 1 ){
            return this._http.get<IdataSelect[]>(this._urlById + "tipotransmision", {params: Params})
            .catch(this.handleError);
        }
    }

    Insert(parameters): Observable<IServerResponse[]>{

        //Inicializamos un nuevo onjeto de tipo HttpParams
        let Params = new HttpParams();
        Params = Params.append("clave", parameters.clave);
        Params = Params.append("descripcion", parameters.descripcion);
        Params = Params.append("empresa", parameters.empresa);
        if( parameters.use == 1 ){ 
            return this._http.get<IServerResponse[]>(this._urlInsert + "tipotransmision", {params: Params})
            .catch(this.handleError);
        }
    }

    Delete(parameters): Observable<IServerResponse[]>{

        //Inicializamos un nuevo onjeto de tipo HttpParams
        let Params = new HttpParams();
        Params = Params.append("claveId", parameters.claveId);

        if( parameters.use == 1 ){ 
            return this._http.get<IServerResponse[]>(this._urlDelete + "tipotransmision", {params: Params})
            .catch(this.handleError);
        }
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

}
