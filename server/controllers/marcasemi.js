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

    var pi_id = req.query.pi_id;
    var pv_NombreCto = req.query.pv_NombreCto;
    var pv_Descripcion = req.query.pv_Descripcion;
    var pi_IdEmpresa = req.query.pi_IdEmpresa;

    console.log('QueryString = ' + JSON.stringify(req.query));

    var params = [
        { name: 'pi_id', value: pi_id, type: self.model.types.INT },
        { name: 'pv_NombreCto', value: pv_NombreCto, type: self.model.types.STRING },
        { name: 'pv_Descripcion', value: pv_Descripcion, type: self.model.types.STRING },
        { name: 'pi_IdEmpresa', value: pi_IdEmpresa, type: self.model.types.INT }
    ];

    this.model.query('[Catalogo].[SP_ActMarcaSemiCMS]', params, function (error, result) {

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

    var pv_NombreCto = req.body.pv_NombreCto;
    var pv_Descripcion = req.body.pv_Descripcion;
    var pi_IdEmpresa = req.body.pi_IdEmpresa;

    console.log('QueryString = ' + req.query);

    var params = [
        { name: 'pv_NombreCto', value: pv_NombreCto, type: self.model.types.STRING },
        { name: 'pv_Descripcion', value: pv_Descripcion, type: self.model.types.STRING },
        { name: 'pi_IdEmpresa', value: pi_IdEmpresa, type: self.model.types.INT }
    ];

    this.model.query('[Catalogo].[SP_InsMarcaSemiCMS]', params, function (error, result) {

        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

module.exports = marcasemi;