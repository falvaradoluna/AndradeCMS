var TipoView = require('../views/reference'),
    ModelView = require('../models/dataAccess'),
    fs = require("fs");

var tipo = function(conf) {
    this.conf = conf || {};
    this.view = new TipoView();
    this.model = new ModelView({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
}    

//api/tipo/tipounidad
tipo.prototype.get_tipounidad = function( req, res, next ){
    var self = this;
    var table = req.query.table;
    // console.log("Query", req.query);
    var params = [
        { name: 'table', value: table, type: self.model.types.STRING }
    ];

    this.model.query("SEL_AnyTableSNRel_SP", params, function( error, result ){
        // console.log( result );
        if( result.length > 0){
            //console.log( "Resultado: " + result );
        }
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


module.exports = tipo;