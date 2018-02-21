import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

//Interfaces
import { ISemImg } from "./semimg"
import { IServerResponse } from "../promociones/ServerResponse";
import { ICatAtributosSem } from "./satributo";

@Injectable()
export class SeminuevoService {

  //Rutas para las peticiones a la api
  private _urlgetImgSemi            = "api/seminuevo/imgsemi";
  private _urlInsertImagenSemi      = "api/seminuevo/insertimagensemi";
  private _urlUpdateImagenSemi      = "api/seminuevo/updateimagensemi";
  private _urlDeleteImagenSemi      = "api/seminuevo/deleteimgsemi";
  private _urlGetAtributos          = "api/seminuevo/atributos";
  private _urlInsertAtributos       = "api/seminuevo/insertatributos";
  private _urlUpdateAtributos       = "api/seminuevo/updateatributos"
  private _urlDeleteAtributos       = "api/seminuevo/deleteatributos";

  constructor(private _http: HttpClient) { }

    GetImgsSemi(parameters): Observable<ISemImg[]>{
        
        let Params = new HttpParams();
        Params = Params.append("cis_IdSeminuevo", parameters.cis_IdSeminuevo);

        return this._http.get<ISemImg[]>(this._urlgetImgSemi, {params: Params})
        .catch( this.handleError );
    };

    saveImagenSemi(cuerpo): Observable<IServerResponse[]>{
        console.log( 'cuerpo', cuerpo.value );
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/form-data');
        return this._http.post<IServerResponse[]>(this._urlInsertImagenSemi, cuerpo.value, { headers: headers});
    }

    updateImagenSemi(cuerpo): Observable<IServerResponse[]>{
        console.log( 'cuerpo', cuerpo.value );
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/form-data');
        return this._http.post<IServerResponse[]>(this._urlUpdateImagenSemi, cuerpo.value, { headers: headers});
    }

    DeleteImgsSemi(parameters): Observable<IServerResponse[]>{
        
        let Params = new HttpParams();
        Params = Params.append("cis_IdSeminuevo", parameters.cis_IdSeminuevo);
        Params = Params.append("cis_idImagenSemi", parameters.cis_idImagenSemi);

        return this._http.get<IServerResponse[]>(this._urlDeleteImagenSemi, {params: Params})
        .catch( this.handleError );
    };

    GetAtributos(parameters): Observable<ICatAtributosSem[]>{
        
        let Params = new HttpParams();
        Params = Params.append("is_IdSeminuevo", parameters.is_IdSeminuevo);

        return this._http.get<ICatAtributosSem[]>(this._urlGetAtributos, {params: Params})
        .catch( this.handleError );
    };

    SaveAtributos(parameters): Observable<IServerResponse[]>{
        
        let Params = new HttpParams();
        Params = Params.append("ctse_IdSeminuevo", parameters.ctse_IdSeminuevo);
        Params = Params.append("ctse_Descripcion", parameters.ctse_Descripcion);

        return this._http.get<IServerResponse[]>(this._urlInsertAtributos, {params: Params})
        .catch( this.handleError );
    };

    UpdateAtributos(parameters): Observable<IServerResponse[]>{
        
        let Params = new HttpParams();
        Params = Params.append("ctse_IdSeminuevo",  parameters.ctse_IdSeminuevo);
        Params = Params.append("ctse_idAtributo",   parameters.ctse_idAtributo);
        Params = Params.append("ctse_Descripcion",  parameters.ctse_Descripcion);
        console.log("Servicio", Params)
        return this._http.get<IServerResponse[]>(this._urlUpdateAtributos, {params: Params})
        .catch( this.handleError );
    };

    DeleteAtributos(parameters): Observable<IServerResponse[]>{
        
        let Params = new HttpParams();
        Params = Params.append("ctse_idAtributo",  parameters.ctse_idAtributo);
        Params = Params.append("ctse_IdSeminuevo", parameters.ctse_IdSeminuevo);

        return this._http.get<IServerResponse[]>(this._urlDeleteAtributos, {params: Params})
        .catch( this.handleError );
    };

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

}
