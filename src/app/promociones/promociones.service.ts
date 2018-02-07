import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { IPromociones } from './promociones'; //Importamos la intefaz para cachar los datos
import { IServerResponse } from "./ServerResponse";
import { IEmpresas } from "./empresas";
import { ITipoPromocion } from "./tipo-promocion";
import { IMarca } from "./marca";
import { ISucursal } from "./sucursal";
import { IPromocionesById } from "./promocionById";
import { Iimage } from "./Img";

@Injectable()
export class PromocionesService {
    
    //Rutas para las peticiones a la api
    private _urlPromociones     = "api/promociones/promociones";
    private _urlDeletePromo     = "api/promociones/deletepromociones";
    private _urlEmpresas        = "api/promociones/empresas";
    private _urlTipoPromo       = "api/promociones/tipopromocion";
    private _urlMarca           = "api/promociones/marca";
    private _urlSucursal        = "api/promociones/sucursal";
    private _urlInsertPromo     = "api/promociones/insertpromocion";
    private _urlGetPromoById    = "api/promociones/getpromocionbyid";
    private _urlUpdatePromo     = "api/promociones/updatepromocion";
    private _urlUpdateImage     = "api/promociones/updateimage";

    constructor(private _http: HttpClient) { }

    getPromoColumn(): Observable<IPromociones[]>{

        //Inicializamos un nuevo onjeto de tipo HttpParams
        let Params = new HttpParams();

        return this._http.get<IPromociones[]>(this._urlPromociones, {params: Params})
        .catch(this.handleError);
    }

    getEmpresas(): Observable<IEmpresas[]>{

        //Inicializamos un nuevo onjeto de tipo HttpParams
        let Params = new HttpParams();

        return this._http.get<IEmpresas[]>(this._urlEmpresas, {params: Params})
        .catch(this.handleError);
    }

    getTipoPromocion(): Observable<ITipoPromocion[]>{

        //Inicializamos un nuevo onjeto de tipo HttpParams
        let Params = new HttpParams();

        return this._http.get<ITipoPromocion[]>(this._urlTipoPromo, {params: Params})
        .catch(this.handleError);
    }

    GetMarcaBy_empId(parameters): Observable<IMarca[]>{
        
        let Params = new HttpParams();
        Params = Params.append("empId", parameters.empId);

        return this._http.get<IMarca[]>(this._urlMarca, {params: Params})
        .catch( this.handleError );
    }

    GetSucursalBy_empId(parameters): Observable<ISucursal[]>{
        
        let Params = new HttpParams();
        Params = Params.append("empId", parameters.empId);

        return this._http.get<ISucursal[]>(this._urlSucursal, {params: Params})
        .catch( this.handleError );
    }

    deletePromocion(parameters): Observable<IServerResponse[]>{
        
        let Params = new HttpParams();
        Params = Params.append("promoId", parameters.promoId);

        return this._http.get<IServerResponse[]>(this._urlDeletePromo, {params: Params})
        .catch( this.handleError );
    }

    GetPromocion_ById(parameters): Observable<IPromocionesById[]>{
        
        let Params = new HttpParams();
        Params = Params.append("promoId", parameters.promoId);

        return this._http.get<IPromocionesById[]>(this._urlGetPromoById, {params: Params})
        .catch( this.handleError );
    }

    savePromocion(cuerpo): Observable<IServerResponse[]>{
        console.log( 'cuerpo', cuerpo );
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/form-data');
        return this._http.post<IServerResponse[]>(this._urlInsertPromo, cuerpo.value, { headers: headers});
    }

    UpdateImage(cuerpo): Observable<IServerResponse[]>{
        console.log( "Sevicios" );
        console.log( 'cuerpo', cuerpo );
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/form-data');
        return this._http.post<IServerResponse[]>(this._urlUpdateImage, cuerpo.value, { headers: headers});
    }

    UpdatePromocion(parameters): Observable<IServerResponse[]>{
        
        let Params = new HttpParams();
        Params = Params.append("po_IdTipoPromocion", parameters.po_IdTipoPromocion);
        Params = Params.append("po_idEmpresa", parameters.po_idEmpresa);
        Params = Params.append("po_IdSucursal", parameters.po_IdSucursal);
        Params = Params.append("po_IdMarca", parameters.po_IdMarca);
        Params = Params.append("po_Descripcion", parameters.po_Descripcion);
        //Params = Params.append("po_RutaImagen", parameters.po_RutaImagen);
        Params = Params.append("po_IdUsuario", parameters.po_IdUsuario);
        Params = Params.append("po_IdPromocion", parameters.po_IdPromocion);

        return this._http.get<IServerResponse[]>(this._urlUpdatePromo, {params: Params})
        .catch( this.handleError );
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

}
