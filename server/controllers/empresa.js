var EmpView = require('../views/reference'),
    ModelView = require('../models/dataAccess'),
    fs = require("fs");

var empresa = function(conf) {
    this.conf = conf || {};
    this.view = new EmpView();
    this.model = new ModelView({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
}    

//api/empresa/empresa
empresa.prototype.get_empresa = function( req, res, next ){
    console.log( "Hola" );
    var self = this;
    // var table = req.query.table;
    // console.log("Query", req.query);
    var params = [];

    this.model.query("Emp_GetEmpresas_SP", params, function( error, result ){
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


module.exports = empresa;