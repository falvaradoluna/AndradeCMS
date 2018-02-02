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
    console.log("Query", query);
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
module.exports = tipos;