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

//api/tipo/insert
tipo.prototype.get_insert = function( req, res, next ){
    var self = this;
    var insert = req.query.insert;
    console.log(insert);
    // console.log("Query", req.query);
    var params = [
        { name: 'insert', value: insert, type: self.model.types.STRING }
    ];

    this.model.query("INS_GenereicAnyTable_SP", params, function( error, result ){
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

//api/tipo/gettipounidadbyid
tipo.prototype.get_gettipounidadbyid = function( req, res, next ){
    var self = this;
    var tu_IdTipo = req.query.tu_IdTipo;
    console.log(tu_IdTipo);
    // console.log("Query", req.query);
    var params = [
        { name: 'tu_IdTipo', value: tu_IdTipo, type: self.model.types.INT }
    ];

    this.model.query("TUnidad_GetTUniById_SP", params, function( error, result ){
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

//api/tipo/update
tipo.prototype.get_update = function( req, res, next ){
    var self = this;
    var update = req.query.update;
    // console.log("Query", req.query);
    var params = [
        { name: 'update', value: update, type: self.model.types.STRING }
    ];

    this.model.query("Upd_GenereicAnyTable_SP", params, function( error, result ){
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

//api/tipo/delete
tipo.prototype.get_delete = function( req, res, next ){
    var self = this;
    var deletes = req.query.deletes;
    console.log(deletes);
    // console.log("Query", req.query);
    var params = [
        { name: 'deletes', value: deletes, type: self.model.types.STRING }
    ];

    this.model.query("DEL_GenereicAnyTable_SP", params, function( error, result ){
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