import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {
    HttpClient,
    HttpErrorResponse,
    HttpParams,
    HttpHeaders
} from '@angular/common/http';

import { IResponse } from './response';
import { IMarcasemi } from './marcasemi';

@Injectable()
export class MarcasemiService {

    private url = 'api/marcasemi/';
    private catalogo = 'api/catalogo/';

    constructor(private _http: HttpClient) { }

    getMarcasemis(): Observable<IMarcasemi[]> {
        const Params = new HttpParams();
        return this._http.get<IMarcasemi[]>(this.url + 'marcasemis', { params: Params })
            .catch(this.handleError);
    }

    getEmpresas(): Observable<IMarcasemi[]> {
        const Params = new HttpParams();
        return this._http.get<IMarcasemi[]>(this.catalogo + 'empresas', { params: Params })
            .catch(this.handleError);
    }

    getDirectoriobyid(parameters): Observable<IMarcasemi[]> {
        let Params = new HttpParams();
        Params = Params.append('directorioId', parameters.directorioId);

        return this._http.get<IMarcasemi[]>(this.url + 'directoriobyid', { params: Params })
            .catch(this.handleError);
    }

    UpdateMarcasemi(parameters): Observable<IResponse[]> {
        let Params = new HttpParams();
        Params = Params.append('pi_id', parameters.ms_IdMarca);
        Params = Params.append('pv_NombreCto', parameters.ms_NombreCto);
        Params = Params.append('pv_Descripcion', parameters.ms_Descripcion);
        Params = Params.append('pi_IdEmpresa', parameters.em_IdEmpresa);

        return this._http.get<IResponse[]>(this.url + 'updateMarcasemi', { params: Params })
            .catch(this.handleError);
    }

    InsertMarcasemi(parameters): Observable<IResponse[]> {

        return this._http.post<IResponse[]>(this.url + 'insertMarcasemi', parameters)
            .catch(this.handleError);
    }

    DeleteMarcasemi(parameters): Observable<IResponse[]> {
        let Params = new HttpParams();
        Params = Params.append('pi_id', parameters.marcasemiId);

        return this._http.get<IResponse[]>(this.url + 'deleteMarcasemi', { params: Params })
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
