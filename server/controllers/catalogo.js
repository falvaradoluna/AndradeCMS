var PromoView = require('../views/reference'),
    ModelView = require('../models/dataAccess'),
    fs = require("fs");

var catalogo = function (conf) {
    this.conf = conf || {};
    this.view = new PromoView();
    this.model = new ModelView({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
}

catalogo.prototype.get_empresas = function (req, res, next) {
    var self = this;
    var params = [];

    this.model.query("[dbo].[SP_SelIdEmpresas]", params, function (error, result) {
        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

catalogo.prototype.get_sucursales = function (req, res, next) {
    var self = this;
    var params = [];

    this.model.query("[dbo].[SP_SelIdSucursal]", params, function (error, result) {
        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

catalogo.prototype.get_puestos = function (req, res, next) {
    var self = this;
    var params = [];

    this.model.query("[dbo].[SP_SelIdPuestos]", params, function (error, result) {
        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = catalogo;