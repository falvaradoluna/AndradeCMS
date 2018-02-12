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
import { ICatAtributos } from "./atributos";

@Injectable()
export class CatunidadService {

    //Rutas para las peticiones a la api
    private _urlgetImg          = "api/catunidad/imgunidad";
    private _urlInsertImagen    = "api/catunidad/insertimagen";
    private _urlUpdateImagen    = "api/catunidad/updateimagen";
    private _urlGetFichas       = "api/catunidad/fichaunidad";
    private _urlDeleteImagen    = "api/catunidad/deleteimg";
    private _urlInsertFicha     = "api/catunidad/insertficha";
    private _urlUpdateFicha     = "api/catunidad/updateficha";
    private _urlDeleteFicha     = "api/catunidad/deleteficha";
    private _urlGetAtributos    = "api/catunidad/atributos";
    private _urlInsertAtributos = "api/catunidad/insertatributos";
    private _urlUpdateAtributos = "api/catunidad/updateatributos";
    private _urlDeleteAtributos = "api/catunidad/deleteatributos";

    constructor(private _http: HttpClient) { }

    GetImgsUnidad(parameters): Observable<ICatImg[]>{
        
        let Params = new HttpParams();
        Params = Params.append("ci_IdCatUnidad", parameters.ci_IdCatUnidad);

        return this._http.get<ICatImg[]>(this._urlgetImg, {params: Params})
        .catch( this.handleError );
    }

    saveImagen(cuerpo): Observable<IServerResponse[]>{
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/form-data');
        return this._http.post<IServerResponse[]>(this._urlInsertImagen, cuerpo.value, { headers: headers});
    };

    updateImagen(cuerpo): Observable<IServerResponse[]>{
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/form-data');
        return this._http.post<IServerResponse[]>(this._urlUpdateImagen, cuerpo.value, { headers: headers});
    };

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

    saveFicha(cuerpo): Observable<IServerResponse[]>{
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/form-data');
        return this._http.post<IServerResponse[]>(this._urlInsertFicha, cuerpo.value, { headers: headers});
    };

    updateFicha(cuerpo): Observable<IServerResponse[]>{
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/form-data');
        return this._http.post<IServerResponse[]>(this._urlUpdateFicha, cuerpo.value, { headers: headers});
    };

    deleteFicha(parameters): Observable<IServerResponse[]>{
        
        let Params = new HttpParams();
        Params = Params.append("caf_idFicha", parameters.caf_idFicha);
        Params = Params.append("caf_idCatUnidad", parameters.caf_idCatUnidad);

        return this._http.get<IServerResponse[]>(this._urlDeleteFicha, {params: Params})
        .catch( this.handleError );
    };

    GetAtributos(parameters): Observable<ICatAtributos[]>{
        
        let Params = new HttpParams();
        Params = Params.append("cata_idCatUnidad", parameters.cata_idCatUnidad);

        return this._http.get<ICatAtributos[]>(this._urlGetAtributos, {params: Params})
        .catch( this.handleError );
    };

    SaveAtributos(parameters): Observable<IServerResponse[]>{
        
        let Params = new HttpParams();
        Params = Params.append("cata_idCatUnidad", parameters.cata_idCatUnidad);
        Params = Params.append("cata_Descripcion", parameters.cata_Descripcion);

        return this._http.get<IServerResponse[]>(this._urlInsertAtributos, {params: Params})
        .catch( this.handleError );
    };

    UpdateAtributos(parameters): Observable<IServerResponse[]>{
        
        let Params = new HttpParams();
        Params = Params.append("cata_idAtributo",  parameters.cata_idAtributo);
        Params = Params.append("cata_idCatUnidad", parameters.cata_idCatUnidad);
        Params = Params.append("cata_Descripcion", parameters.cata_Descripcion);

        return this._http.get<IServerResponse[]>(this._urlUpdateAtributos, {params: Params})
        .catch( this.handleError );
    };

    DeleteAtributos(parameters): Observable<IServerResponse[]>{
        
        let Params = new HttpParams();
        Params = Params.append("cata_idAtributo",  parameters.cata_idAtributo);
        Params = Params.append("cata_idCatUnidad", parameters.cata_idCatUnidad);

        return this._http.get<IServerResponse[]>(this._urlDeleteAtributos, {params: Params})
        .catch( this.handleError );
    };

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    };

}
