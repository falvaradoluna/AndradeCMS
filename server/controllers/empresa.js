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

//api/empresa/sucursales
empresa.prototype.get_sucursales = function( req, res, next ){
    var self = this;
    // var table = req.query.table;
    // console.log("Query", req.query);
    var params = [];

    this.model.query("Sucursal_GetSucursales_SP", params, function( error, result ){
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

//api/empresa/marcas
empresa.prototype.get_marcas = function( req, res, next ){
    var self = this;
    // var table = req.query.table;
    // console.log("Query", req.query);
    var params = [];

    this.model.query("Marca_GetMarcas_SP", params, function( error, result ){
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

// "api/empresa/marca"
empresa.prototype.get_marca = function(req, res, next) {
    var self = this;
    var empId = req.query.empId;
   // console.log('QueryString = ' + req.query);

    var params = [
        { name: 'Emp_id', value: empId, type: self.model.types.INT }
    ];

    this.model.query('Marca_GetMarcaById_SP', params, function (error, result) {
        //console.log('Parametros: ' + params);
        if (result.length > 0) {

         //console.log("resultaaaaaaa " + result[0]);
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// "api/empresa/sucursal"
empresa.prototype.get_sucursal = function(req, res, next) {
    var self = this;
    var empId = req.query.empId;
    //console.log('QueryString = ' + req.query);

    var params = [
        { name: 'Emp_id', value: empId, type: self.model.types.INT }
    ];

    this.model.query('Sucursal_GetSucursalById_SP', params, function (error, result) {
        //console.log('Parametros: ' + params);
        if (result.length > 0) {

         //console.log("resultaaaaaaa " + result[0]);
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};


module.exports = empresa;