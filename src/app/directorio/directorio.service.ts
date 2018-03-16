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

import { IResponse } from './Response';
import { IDirectorio } from './directorio';

@Injectable()
export class DirectorioService {

    private url = 'api/directorio/';
    private catalogo = 'api/catalogo/';

    constructor(private _http: HttpClient) { }

    getDirectorios(): Observable<IDirectorio[]> {
        const Params = new HttpParams();
        return this._http.get<IDirectorio[]>(this.url + 'directorios', { params: Params })
            .catch(this.handleError);
    }

    getEmpresas(): Observable<IDirectorio[]> {
        const Params = new HttpParams();
        return this._http.get<IDirectorio[]>(this.catalogo + 'empresas', { params: Params })
            .catch(this.handleError);
    }

    getSucursales(): Observable<IDirectorio[]> {
        const Params = new HttpParams();
        return this._http.get<IDirectorio[]>(this.catalogo + 'sucursales', { params: Params })
            .catch(this.handleError);
    }

    getPuestos(): Observable<IDirectorio[]> {
        const Params = new HttpParams();
        return this._http.get<IDirectorio[]>(this.catalogo + 'puestos', { params: Params })
            .catch(this.handleError);
    }

    getDirectoriobyid(parameters): Observable<IDirectorio[]> {
        let Params = new HttpParams();
        Params = Params.append('directorioId', parameters.directorioId);

        return this._http.get<IDirectorio[]>(this.url + 'directoriobyid', { params: Params })
            .catch(this.handleError);
    }

    UpdateDirectorio(parameters, idUsuario): Observable<IResponse[]> {
        let Params = new HttpParams();
        Params = Params.append('pi_id', parameters.di_IdDirectorio);
        Params = Params.append('pi_idEmpresa', parameters.em_IdEmpresa);
        Params = Params.append('pi_IdSucursal', parameters.su_IdSucursal);
        Params = Params.append('pi_IdPuesto', parameters.pu_IdPuesto);
        Params = Params.append('pv_ApellidoPaterno', parameters.di_ApellidoPaterno);
        Params = Params.append('pv_ApellidoMaterno', parameters.di_ApellidoMaterno);
        Params = Params.append('pv_Nombre', parameters.di_Nombre);
        Params = Params.append('pv_Correo', parameters.di_Correo);
        Params = Params.append('pv_TelefonoOf', parameters.di_TelefonoOf);
        Params = Params.append('pv_TelefonoCel', parameters.di_TelefonoCel);
        Params = Params.append('pv_WhatsApp', parameters.di_WhatsApp);
        Params = Params.append('pv_FaceBook', parameters.di_FaceBook);
        Params = Params.append('pn_Orden', '1');
        Params = Params.append('pn_IdUsuario', idUsuario);
        Params = Params.append('di_recibeCorreo', parameters.di_recibeCorreo);

        return this._http.get<IResponse[]>(this.url + 'updateDirectorio', { params: Params })
            .catch(this.handleError);
    }

    InsertDirectorio(parameters): Observable<IResponse[]> {

        return this._http.post<IResponse[]>(this.url + 'insertDirectorio', parameters)
            .catch(this.handleError);
    }

    DeleteDirectorio(parameters): Observable<IResponse[]> {
        let Params = new HttpParams();
        Params = Params.append('pi_id', parameters.directorioId);

        return this._http.get<IResponse[]>(this.url + 'deleteDirectorio', { params: Params })
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
