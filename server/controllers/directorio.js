var PromoView = require('../views/reference'),
    ModelView = require('../models/dataAccess'),
    fs = require("fs");

var directorio = function (conf) {
    this.conf = conf || {};
    this.view = new PromoView();
    this.model = new ModelView({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
}

directorio.prototype.get_directorios = function (req, res, next) {
    var self = this;

    var params = [];

    this.model.query("[dbo].[SP_SelDirectorioCMS]", params, function (error, result) {

        // if (result.length > 0) {
        // }
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

directorio.prototype.get_directoriobyid = function (req, res, next) {
    var self = this;
    var directorioId = req.query.directorioId;

    var params = [
        { name: 'idDirectorio', value: directorioId, type: self.model.types.INT }
    ];

    this.model.query('[dbo].[SEL_DirectorioById_SP]', params, function (error, result) {

        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

directorio.prototype.get_updateDirectorio = function (req, res, next) {
    var self = this;

    var pi_id = req.query.pi_id;
    var pi_idEmpresa = req.query.pi_idEmpresa;
    var pi_IdSucursal = req.query.pi_IdSucursal;
    var pi_IdPuesto = req.query.pi_IdPuesto;
    var pv_ApellidoPaterno = req.query.pv_ApellidoPaterno;
    var pv_ApellidoMaterno = req.query.pv_ApellidoMaterno;
    var pv_Nombre = req.query.pv_Nombre;
    var pv_Correo = req.query.pv_Correo;
    var pv_TelefonoOf = req.query.pv_TelefonoOf;
    var pv_TelefonoCel = req.query.pv_TelefonoCel;
    var pv_WhatsApp = req.query.pv_WhatsApp;
    var pv_FaceBook = req.query.pv_FaceBook;
    var pn_Orden = req.query.pn_Orden;
    var pn_IdUsuario = req.query.pn_IdUsuario;
    var di_recibeCorreo = req.query.di_recibeCorreo

    console.log('QueryString = ' + JSON.stringify(req.query));

    var params = [
        { name: 'pi_id', value: pi_id, type: self.model.types.INT },
        { name: 'pi_idEmpresa', value: pi_idEmpresa, type: self.model.types.INT },
        { name: 'pi_IdSucursal', value: pi_IdSucursal, type: self.model.types.INT },
        { name: 'pi_IdPuesto', value: pi_IdPuesto, type: self.model.types.INT },
        { name: 'pv_ApellidoPaterno', value: pv_ApellidoPaterno, type: self.model.types.STRING },
        { name: 'pv_ApellidoMaterno', value: pv_ApellidoMaterno, type: self.model.types.STRING },
        { name: 'pv_Nombre', value: pv_Nombre, type: self.model.types.STRING },
        { name: 'pv_Correo', value: pv_Correo, type: self.model.types.STRING },
        { name: 'pv_TelefonoOf', value: pv_TelefonoOf, type: self.model.types.STRING },
        { name: 'pv_TelefonoCel', value: pv_TelefonoCel, type: self.model.types.STRING },
        { name: 'pv_WhatsApp', value: pv_WhatsApp, type: self.model.types.STRING },
        { name: 'pv_FaceBook', value: pv_FaceBook, type: self.model.types.STRING },
        { name: 'pn_Orden', value: pn_Orden, type: self.model.types.INT },
        { name: 'pn_IdUsuario', value: pn_IdUsuario, type: self.model.types.INT },
        { name: 'di_recibeCorreo', value: di_recibeCorreo, type: self.model.types.INT }
    ];

    this.model.query('[dbo].[SP_ActDirectorioCMS]', params, function (error, result) {
        console.log( "error", error );
        console.log( "result", result );
        // if (result.length > 0) {
        // }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

directorio.prototype.get_deleteDirectorio = function (req, res, next) {
    var self = this;
    var pi_id = req.query.pi_id;

    var params = [
        { name: 'pi_id', value: pi_id, type: self.model.types.INT }
    ];

    this.model.query('[dbo].[SP_ElimDirectorioCMS]', params, function (error, result) {

        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

directorio.prototype.post_insertDirectorio = function (req, res, next) {
    var self = this;

    var pi_idEmpresa        = req.body.pi_idEmpresa;
    var pi_IdSucursal       = req.body.pi_IdSucursal;
    var pi_IdPuesto         = req.body.pi_IdPuesto;
    var pv_ApellidoPaterno  = req.body.pv_ApellidoPaterno;
    var pv_ApellidoMaterno  = req.body.pv_ApellidoMaterno;
    var pv_Nombre           = req.body.pv_Nombre;
    var pv_Correo           = req.body.pv_Correo;
    var pv_TelefonoOf       = req.body.pv_TelefonoOf;
    var pv_TelefonoCel      = req.body.pv_TelefonoCel;
    var pv_WhatsApp         = req.body.pv_WhatsApp;
    var pv_FaceBook         = req.body.pv_FaceBook;
    var pn_Orden            = req.body.pn_Orden;
    var pn_IdUsuario        = req.body.pn_IdUsuario;
    var di_recibeCorreo     = req.body.pn_RecibeMail;

    var params = [
        { name: 'pi_idEmpresa',         value: pi_idEmpresa, type: self.model.types.INT },
        { name: 'pi_IdSucursal',        value: pi_IdSucursal, type: self.model.types.INT },
        { name: 'pi_IdPuesto',          value: pi_IdPuesto, type: self.model.types.INT },
        { name: 'pv_ApellidoPaterno',   value: pv_ApellidoPaterno, type: self.model.types.STRING },
        { name: 'pv_ApellidoMaterno',   value: pv_ApellidoMaterno, type: self.model.types.STRING },
        { name: 'pv_Nombre',            value: pv_Nombre, type: self.model.types.STRING },
        { name: 'pv_Correo',            value: pv_Correo, type: self.model.types.STRING },
        { name: 'pv_TelefonoOf',        value: pv_TelefonoOf, type: self.model.types.STRING },
        { name: 'pv_TelefonoCel',       value: pv_TelefonoCel, type: self.model.types.STRING },
        { name: 'pv_WhatsApp',          value: pv_WhatsApp, type: self.model.types.STRING },
        { name: 'pv_FaceBook',          value: pv_FaceBook, type: self.model.types.STRING },
        { name: 'pn_Orden',             value: pn_Orden, type: self.model.types.INT },
        { name: 'pn_IdUsuario',         value: pn_IdUsuario, type: self.model.types.INT },
        { name: 'di_recibeCorreo',      value: di_recibeCorreo, type: self.model.types.INT }
    ];
    console.log( "Params", params );
    this.model.query('[dbo].[SP_InsDirectorioCMS]', params, function (error, result) {
        console.log( "error", error );
        console.log( "result", result );
        if (result.length > 0) {
        }else{

        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

module.exports = directorio;