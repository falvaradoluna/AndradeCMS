var PromoView = require('../views/reference'),
ModelView = require('../models/dataAccess'),
fs = require("fs");

var marcasemi = function(conf) {
    this.conf = conf || {};
    this.view = new PromoView();
    this.model = new ModelView({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
}    

marcasemi.prototype.get_marcasemis = function( req, res, next ){
    var self = this;
    
    var params = [];

    this.model.query("[Catalogo].[SP_SelMarcaSemiCMS]", params, function( error, result ){

        if( result.length > 0){
        }
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

marcasemi.prototype.get_marcasemibyid = function(req, res, next) {
    var self = this;
    var directorioId = req.query.directorioId;

    var params = [
        { name: 'idDirectorio', value: directorioId, type: self.model.types.INT }
    ];

    this.model.query('[Catalogo].[SEL_DirectorioById_SP]', params, function (error, result) {

        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

marcasemi.prototype.get_updateMarcasemi = function(req, res, next) {
    var self = this;

    var idEmpresa = req.query.idEmpresa;
    var IdSucursal = req.query.IdSucursal;
    var IdPuesto = req.query.IdPuesto;
    var ApellidoPaterno = req.query.ApellidoPaterno;
    var ApellidoMaterno = req.query.ApellidoMaterno;
    var Nombre = req.query.Nombre;
    var Correo = req.query.Correo;
    var TelefonoOf = req.query.TelefonoOf;
    var TelefonoCel = req.query.TelefonoCel;
    var WhatsApp = req.query.WhatsApp;
    var FaceBook = req.query.FaceBook;
    var Orden = req.query.Orden;
    var IdUsuario = req.query.IdUsuario;

    console.log('QueryString = ' + JSON.stringify(req.query));

    var params = [
        { name: 'idEmpresa', value: idEmpresa, type: self.model.types.INT },
        { name: 'IdSucursal', value: IdSucursal, type: self.model.types.INT },
        { name: 'IdPuesto', value: IdPuesto, type: self.model.types.INT },
        { name: 'ApellidoPaterno', value: ApellidoPaterno, type: self.model.types.STRING },
        { name: 'ApellidoMaterno', value: ApellidoMaterno, type: self.model.types.STRING },
        { name: 'Nombre', value: Nombre, type: self.model.types.STRING },
        { name: 'Correo', value: Correo, type: self.model.types.STRING },
        { name: 'TelefonoOf', value: TelefonoOf, type: self.model.types.STRING },
        { name: 'TelefonoCel', value: TelefonoCel, type: self.model.types.STRING },
        { name: 'WhatsApp', value: WhatsApp, type: self.model.types.STRING },
        { name: 'FaceBook', value: FaceBook, type: self.model.types.STRING },
        { name: 'Orden', value: Orden, type: self.model.types.INT },
        { name: 'IdUsuario', value: IdUsuario, type: self.model.types.INT }
    ];

    this.model.query('[Catalogo].[UPD_Directorio_SP]', params, function (error, result) {

        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

marcasemi.prototype.get_deleteMarcasemi = function(req, res, next) {
    var self = this;
    var pi_id = req.query.pi_id;

    var params = [
        { name: 'pi_id', value: pi_id, type: self.model.types.INT }
    ];

    this.model.query('[Catalogo].[SP_ElimMarcaSemiCMS]', params, function (error, result) {

        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

marcasemi.prototype.post_insertMarcasemi = function(req, res, next) {
    var self = this;

    var idEmpresa = req.body.idEmpresa;
    var IdSucursal = req.body.IdSucursal;
    var IdPuesto = req.body.IdPuesto;
    var ApellidoPaterno = req.body.ApellidoPaterno;
    var ApellidoMaterno = req.body.ApellidoMaterno;
    var Nombre = req.body.Nombre;
    var Correo = req.body.Correo;
    var TelefonoOf = req.body.TelefonoOf;
    var TelefonoCel = req.body.TelefonoCel;
    var WhatsApp = req.body.WhatsApp;
    var FaceBook = req.body.FaceBook;
    var Orden = req.body.Orden;
    var IdUsuario = req.body.IdUsuario;

    console.log('QueryString = ' + req.query);

    var params = [
        { name: 'idEmpresa', value: idEmpresa, type: self.model.types.INT },
        { name: 'IdSucursal', value: IdSucursal, type: self.model.types.INT },
        { name: 'IdPuesto', value: IdPuesto, type: self.model.types.INT },
        { name: 'ApellidoPaterno', value: ApellidoPaterno, type: self.model.types.STRING },
        { name: 'ApellidoMaterno', value: ApellidoMaterno, type: self.model.types.STRING },
        { name: 'Nombre', value: Nombre, type: self.model.types.STRING },
        { name: 'Correo', value: Correo, type: self.model.types.STRING },
        { name: 'TelefonoOf', value: TelefonoOf, type: self.model.types.STRING },
        { name: 'TelefonoCel', value: TelefonoCel, type: self.model.types.STRING },
        { name: 'WhatsApp', value: WhatsApp, type: self.model.types.STRING },
        { name: 'FaceBook', value: FaceBook, type: self.model.types.STRING },
        { name: 'Orden', value: Orden, type: self.model.types.INT },
        { name: 'IdUsuario', value: IdUsuario, type: self.model.types.INT }
    ];

    this.model.query('[Catalogo].[INS_Directorio_SP] ', params, function (error, result) {

        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

module.exports = marcasemi;