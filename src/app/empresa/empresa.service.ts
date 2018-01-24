import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
//Importacion de las interfaces
import { IEmpresas } from "./empresas";

@Injectable()
export class EmpresaService {
    //constantes para las rutas de las peticiones a las apis
    private _urlEmpresas = "api/empresa/empresa";

    constructor( private _http: HttpClient ) { }

    getEmpresas(): Observable<IEmpresas[]>{
        //Inicializamos un nuevo onjeto de tipo HttpParams
        let Params = new HttpParams();

        return this._http.get<IEmpresas[]>(this._urlEmpresas, {params: Params})
        .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

}
