import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

//Interfaces
import { IdataSelect } from "./dataSelect";


@Injectable()
export class TiposService {

  constructor(private _http: HttpClient) { }

  //URL para las peticiones
  private _urltipos = "api/tipos/select";

  getTable(parameters): Observable<IdataSelect[]>{

    //Inicializamos un nuevo onjeto de tipo HttpParams
    let Params = new HttpParams();
    Params = Params.append("query", parameters.query);

    return this._http.get<IdataSelect[]>(this._urltipos, {params: Params})
        .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

}
