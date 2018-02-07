var TiposView = require('../views/reference'),
    ModelView = require('../models/dataAccess'),
    fs = require("fs");

var tipos = function(conf) {
    this.conf = conf || {};
    this.view = new TiposView();
    this.model = new ModelView({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};  

//api/tipo/select
tipos.prototype.get_select = function( req, res, next ){
    var self = this;
    var query = req.query.query;
    //console.log("Query", query);
    var params = [
        { name: 'table', value: query, type: self.model.types.STRING }
    ];

    this.model.query("SEL_AnyTableSNRel_SP", params, function( error, result ){
        // console.log( result );
        // console.log( error );

        // if( error ){

        // }
        // else{
        //     if( result.length > 0){
        //         //console.log( "Resultado: " + result );
        //     }
        // }
        

        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

//api/tipos/inserttipotransmision
tipos.prototype.get_inserttipotransmision = function( req, res, next ){
    var self = this;
    var tt_ClaveTransmision = req.query.clave;
    var tt_Descripcion      = req.query.descripcion;
    var tt_idEmpresa        = req.query.empresa;
    //console.log("Query", query);
    var params = [
        { name: 'tt_ClaveTransmision',  value: tt_ClaveTransmision, type: self.model.types.STRING },
        { name: 'tt_Descripcion',       value: tt_Descripcion, type: self.model.types.STRING },
        { name: 'tt_idEmpresa',         value: tt_idEmpresa, type: self.model.types.INT }
    ];

    this.model.query("TipTrans_INSERT_SP", params, function( error, result ){
        // console.log( result );
        // console.log( error );

        // if( error ){

        // }
        // else{
        //     if( result.length > 0){
        //         //console.log( "Resultado: " + result );
        //     }
        // }
        

        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

//api/tipos/deletetipotransmision
tipos.prototype.get_deletetipotransmision = function( req, res, next ){
    var self = this;
    var claveId = req.query.claveId;
    console.log("Query", claveId);
    var params = [
        { name: 'tt_ClaveTransmision', value: claveId, type: self.model.types.STRING }
    ];

    this.model.query("TipTrans_DELETE_SP", params, function( error, result ){
        // console.log( result );
        // console.log( error );

        // if( error ){

        // }
        // else{
        //     if( result.length > 0){
        //         //console.log( "Resultado: " + result );
        //     }
        // }
        

        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

//api/tipo/selectbyidtipotransmision
tipos.prototype.get_selectbyidtipotransmision = function( req, res, next ){
    var self = this;
    var tt_ClaveTransmision = req.query.clave;
    //console.log("Query", query);
    var params = [
        { name: 'tt_ClaveTransmision', value: tt_ClaveTransmision, type: self.model.types.STRING }
    ];

    this.model.query("TipTrans_SELECTbyID_SP", params, function( error, result ){
        console.log( result );
        console.log( error );

        // if( error ){

        // }
        // else{
        //     if( result.length > 0){
        //         //console.log( "Resultado: " + result );
        //     }
        // }
        

        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = tipos;