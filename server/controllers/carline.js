var PromoView = require('../views/reference'),
    ModelView = require('../models/dataAccess'),
    fs = require("fs");

var carline = function (conf) {
    this.conf = conf || {};
    this.view = new PromoView();
    this.model = new ModelView({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
}

carline.prototype.get_carlines = function (req, res, next) {
    var self = this;
    var params = [];

    this.model.query("[dbo].[SP_SelCarlineCMS]", params, function (error, result) {
        console.log( "error", error );
        console.log( "result", result );
        // if (result.length > 0) {
        // }
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

carline.prototype.get_carlinebyid = function (req, res, next) {
    var self = this;
    var idCarline = req.query.idCarline;

    var params = [
        { name: 'idCarline', value: idCarline, type: self.model.types.INT }
    ];

    this.model.query('[dbo].[SEL_CarlineById_SP]', params, function (error, result) {

        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

carline.prototype.get_updateCarline = function (req, res, next) {
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

    this.model.query('[dbo].[SP_ActCarLineCMS]', params, function (error, result) {

        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

carline.prototype.get_deleteCarline = function (req, res, next) {
    var self = this;
    var pi_id = req.query.pi_id;

    var params = [
        { name: 'pi_id', value: pi_id, type: self.model.types.INT }
    ];

    this.model.query('[dbo].[SP_ElimCarLineCMS]', params, function (error, result) {

        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

carline.prototype.post_insertCarline = function (req, res, next) {
    var self = this;

    var pv_NombreCto = req.body.pv_NombreCto;
    var pv_DescripCarline = req.body.pv_DescripCarline;
    var pi_IdEmpresa = req.body.pi_IdEmpresa;

    var params = [
        { name: 'pv_NombreCto', value: pv_NombreCto, type: self.model.types.STRING },
        { name: 'pv_DescripCarline', value: pv_DescripCarline, type: self.model.types.STRING },
        { name: 'pi_IdEmpresa', value: pi_IdEmpresa, type: self.model.types.INT }
    ];

    this.model.query('[dbo].[SP_InsCarlineCMS]', params, function (error, result) {

        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

module.exports = carline;