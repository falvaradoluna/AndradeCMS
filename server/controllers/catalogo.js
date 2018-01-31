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

    this.model.query("[Catalogo].[SP_SelIdEmpresas]", params, function (error, result) {
        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

catalogo.prototype.get_empresasById = function (req, res, next) {
    var self = this;
    var idCarline = req.query.idCarline;

    var params = [
        { name: 'idCarline', value: idCarline, type: self.model.types.INT }
    ];

    this.model.query('[Catalogo].[SEL_CarlineById_SP]', params, function (error, result) {

        if (result.length > 0) {
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};


module.exports = catalogo;