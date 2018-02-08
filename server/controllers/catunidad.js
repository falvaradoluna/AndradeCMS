var CatUnView = require('../views/reference'),
    ModelView = require('../models/dataAccess'),
    fs = require("fs");

var catunidad = function(conf) {
    this.conf = conf || {};
    this.view = new CatUnView();
    this.model = new ModelView({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

//api/catunidad/unidadesnuevas
catunidad.prototype.get_unidadesnuevas = function( req, res, next ){
    var self = this;
    // var table = req.query.table;
    // console.log("Query", req.query);
    var params = [];

    this.model.query("CatUni_SELECT_SP", params, function( error, result ){
        // console.log(result);
        // console.log(error);
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = catunidad;