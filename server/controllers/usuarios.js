var UsuView = require('../views/reference'),
    ModelView = require('../models/dataAccess'),
    fs = require("fs");

var usuarios = function(conf) {
    this.conf = conf || {};
    this.view = new UsuView();
    this.model = new ModelView({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
}    

//api/usuarios/usuarios
usuarios.prototype.get_usuarios = function( req, res, next ){
    var self = this;
    // var table = req.query.table;
    // console.log("Query", req.query);
    var params = [];

    this.model.query("Usu_GetUsuarios_SP", params, function( error, result ){
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

module.exports = usuarios;