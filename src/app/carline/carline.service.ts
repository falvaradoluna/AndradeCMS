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
import { ICarline } from './carline';

@Injectable()
export class CarlineService {

    private url = 'api/carline/';
    private catalogo = 'api/catalogo/';

    constructor(private _http: HttpClient) { }

    getCarlines(): Observable<ICarline[]> {
        const Params = new HttpParams();
        return this._http.get<ICarline[]>(this.url + 'carlines', { params: Params })
            .catch(this.handleError);
    }

    getEmpresas(): Observable<ICarline[]> {
        const Params = new HttpParams();
        return this._http.get<ICarline[]>(this.catalogo + 'empresas', { params: Params })
            .catch(this.handleError);
    }

    getDirectoriobyid(parameters): Observable<ICarline[]> {
        let Params = new HttpParams();
        Params = Params.append('directorioId', parameters.directorioId);

        return this._http.get<ICarline[]>(this.url + 'directoriobyid', { params: Params })
            .catch(this.handleError);
    }

    UpdateCarline(parameters): Observable<IResponse[]> {
        let Params = new HttpParams();
        Params = Params.append('pi_id', parameters.ca_IdCarline);
        Params = Params.append('pv_NombreCto', parameters.ca_NombreCto);
        Params = Params.append('pv_Descripcion', parameters.ca_DescripCarline);
        Params = Params.append('pi_IdEmpresa', parameters.em_IdEmpresa);

        return this._http.get<IResponse[]>(this.url + 'updateCarline', { params: Params })
            .catch(this.handleError);
    }

    InsertCarline(parameters): Observable<IResponse[]> {

        return this._http.post<IResponse[]>(this.url + 'insertCarline', parameters)
            .catch(this.handleError);
    }

    DeleteCarline(parameters): Observable<IResponse[]> {
        let Params = new HttpParams();
        Params = Params.append('pi_id', parameters.carlineId);

        return this._http.get<IResponse[]>(this.url + 'deleteCarline', { params: Params })
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
