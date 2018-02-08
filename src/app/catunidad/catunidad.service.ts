import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

//Inter
import { ICatImg } from "./catimagenes"
import { IServerResponse } from "../promociones/ServerResponse";

@Injectable()
export class CatunidadService {

    //Rutas para las peticiones a la api
    private _urlgetImg          = "api/catunidad/imgunidad";
    private _urlInsertImagen    = "api/catunidad/insertimagen";

    constructor(private _http: HttpClient) { }

    GetImgsUnidad(parameters): Observable<ICatImg[]>{
        
        let Params = new HttpParams();
        Params = Params.append("ci_IdCatUnidad", parameters.ci_IdCatUnidad);

        return this._http.get<ICatImg[]>(this._urlgetImg, {params: Params})
        .catch( this.handleError );
    }

    saveImagen(cuerpo): Observable<IServerResponse[]>{
        console.log( 'cuerpo', cuerpo.value );
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/form-data');
        return this._http.post<IServerResponse[]>(this._urlInsertImagen, cuerpo.value, { headers: headers});
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

}
