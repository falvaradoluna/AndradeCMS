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

    constructor(private _http: HttpClient) { }

    getDirectorios(): Observable<IDirectorio[]> {
        const Params = new HttpParams();
        return this._http.get<IDirectorio[]>(this.url + 'directorios', { params: Params })
        //return this._http.get<IDirectorio[]>('api/promociones/promociones', { params: Params })
            .catch(this.handleError);
    }

    getDirectoriobyid(parameters): Observable<IDirectorio[]> {
        let Params = new HttpParams();
        Params = Params.append('directorioId', parameters.directorioId);

        return this._http.get<IDirectorio[]>(this.url + 'directoriobyid', { params: Params })
            .catch(this.handleError);
    }

    UpdateDirectorio(parameters): Observable<IResponse[]> {
        let Params = new HttpParams();
        Params = Params.append('idDirectorio', parameters.idDirectorio);
        Params = Params.append('idEmpresa', parameters.idEmpresa);
        Params = Params.append('IdSucursal', parameters.IdSucursal);
        Params = Params.append('IdPuesto', parameters.IdPuesto);
        Params = Params.append('ApellidoPaterno', parameters.ApellidoPaterno);
        Params = Params.append('ApellidoMaterno', parameters.ApellidoMaterno);
        Params = Params.append('Nombre', parameters.Nombre);
        Params = Params.append('Correo', parameters.Correo);
        Params = Params.append('TelefonoOf', parameters.TelefonoOf);
        Params = Params.append('TelefonoCel', parameters.TelefonoCel);
        Params = Params.append('WhatsApp', parameters.WhatsApp);
        Params = Params.append('FaceBook', parameters.FaceBook);
        Params = Params.append('IdUsuario', parameters.IdUsuario);

        return this._http.post<IResponse[]>(this.url + 'updateDirectorio', { params: Params })
            .catch(this.handleError);
    }

    InsertDirectorio(parameters): Observable<IResponse[]> {
        let Params = new HttpParams();
        Params = Params.append('idEmpresa', parameters.idEmpresa);
        Params = Params.append('IdSucursal', parameters.IdSucursal);
        Params = Params.append('IdPuesto', parameters.IdPuesto);
        Params = Params.append('ApellidoPaterno', parameters.ApellidoPaterno);
        Params = Params.append('ApellidoMaterno', parameters.ApellidoMaterno);
        Params = Params.append('Nombre', parameters.Nombre);
        Params = Params.append('Correo', parameters.Correo);
        Params = Params.append('TelefonoOf', parameters.TelefonoOf);
        Params = Params.append('TelefonoCel', parameters.TelefonoCel);
        Params = Params.append('WhatsApp', parameters.WhatsApp);
        Params = Params.append('FaceBook', parameters.FaceBook);
        Params = Params.append('IdUsuario', parameters.IdUsuario);

        return this._http.post<IResponse[]>(this.url + 'insertDirectorio', { params: Params })
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
