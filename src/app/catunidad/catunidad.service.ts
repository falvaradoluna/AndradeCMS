import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

//Inter
import { ICatImg } from "./catimagenes"
import { IServerResponse } from "../promociones/ServerResponse";
import { ICatFichas } from "./catfichas";

@Injectable()
export class CatunidadService {

    //Rutas para las peticiones a la api
    private _urlgetImg          = "api/catunidad/imgunidad";
    private _urlInsertImagen    = "api/catunidad/insertimagen";
    private _urlUpdateImagen    = "api/catunidad/updateimagen";
    private _urlGetFichas       = "api/catunidad/fichaunidad";
    private _urlDeleteImagen    = "api/catunidad/deleteimg";

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

    updateImagen(cuerpo): Observable<IServerResponse[]>{
        console.log( 'cuerpo', cuerpo.value );
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/form-data');
        return this._http.post<IServerResponse[]>(this._urlUpdateImagen, cuerpo.value, { headers: headers});
    }

    GetFichasUnidad(parameters): Observable<ICatFichas[]>{
        
        let Params = new HttpParams();
        Params = Params.append("caf_IdCatUnidad", parameters.caf_IdCatUnidad);

        return this._http.get<ICatFichas[]>(this._urlGetFichas, {params: Params})
        .catch( this.handleError );
    };

    DeleteImgs(parameters): Observable<IServerResponse[]>{
        
        let Params = new HttpParams();
        Params = Params.append("ci_IdCatUnidad",    parameters.ci_IdCatUnidad);
        Params = Params.append("ci_IdImagen",       parameters.ci_IdImagen);

        return this._http.get<IServerResponse[]>(this._urlDeleteImagen, {params: Params})
        .catch( this.handleError );
    };

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

}
