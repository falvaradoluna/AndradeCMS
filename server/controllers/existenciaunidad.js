var ExUnView = require('../views/reference'),
    ModelView = require('../models/dataAccess'),
    fs = require("fs");

var existenciaunidad = function(conf) {
    this.conf = conf || {};
    this.view = new ExUnView();
    this.model = new ModelView({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
}    

//api/existenciaunidad/existeUnidad
existenciaunidad.prototype.get_existeUnidad = function( req, res, next ){
    var self = this;
    // var table = req.query.table;
    // console.log("Query", req.query);
    var params = [
        {name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT},
        {name: 'idCatalogoUnidad', value: req.query.idCatalogoUnidad, type: self.model.types.INT},
        {name: 'modelo', value: req.query.modelo, type: self.model.types.STRING}
    ];
    
    
    this.model.query("SEL_ExisteUnidad_SP", params, function( error, result ){
         //console.log("Params", params);
         console.log("Error", error);
         console.log("Result",result);
        /*
        if( result.length > 0){
            console.log( "Resultado: " + result );
        }
        */
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


module.exports = existenciaunidad;