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

//api/usuarios/puestos
usuarios.prototype.get_puestos = function( req, res, next ){
    var self = this;
    // var table = req.query.table;
    // console.log("Query", req.query);
    var params = [];

    this.model.query("Puesto_GetPues_SP", params, function( error, result ){
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

//api/usuarios/insertusuario
usuarios.prototype.get_insertusuario = function( req, res, next ){
    console.log("Hola");
    var self = this;
    var usu_nombre      = req.query.usu_nombre;
    var usu_apellidoP   = req.query.usu_apellidoP;
    var usu_apellidoM   = req.query.usu_apellidoM;
    var usu_puesto      = req.query.usu_puesto;
    var usu_empresa     = req.query.usu_empresa;
    var usu_sucursal    = req.query.usu_sucursal;
    var usu_correo      = req.query.usu_correo;
    var usu_Pass        = req.query.usu_Pass;
    console.log("Query", req.query);
    var params = [
        { name: 'usu_nombre',       value: usu_nombre, type: self.model.types.STRING },
        { name: 'usu_apellidoP',    value: usu_apellidoP, type: self.model.types.STRING },
        { name: 'usu_apellidoM',    value: usu_apellidoM, type: self.model.types.STRING },
        { name: 'usu_puesto',       value: usu_puesto, type: self.model.types.INT },
        { name: 'usu_empresa',      value: usu_empresa, type: self.model.types.INT },
        { name: 'usu_sucursal',     value: usu_sucursal, type: self.model.types.INT },
        { name: 'usu_correo',       value: usu_correo, type: self.model.types.STRING },
        { name: 'usu_Pass',         value: usu_Pass, type: self.model.types.STRING }
    ];

    // this.model.query("Usu_InsUsuario_SP", params, function( error, result ){
    //     // console.log( result );
    //     if( result.length > 0){
    //         //console.log( "Resultado: " + result );
    //     }
    //     self.view.expositor(res, {
    //         error: error,
    //         result: result
    //     });
    // });
};

//api/usuario/delete
usuarios.prototype.get_delete = function( req, res, next ){
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

//"api/usuarios/getusubyid";
usuarios.prototype.get_getusubyid = function( req, res, next ){
    // console.log( "Hola" );
    var self = this;
    var usu_id = req.query.usu_id;
    // console.log("QueryById", req.query);
    var params = [
        {name: 'usu_id', value: usu_id, type: self.model.types.INT}
    ];

    this.model.query("Usuario_GetUsuById_SP", params, function( error, result ){
        // console.log( result );
        if( result.length > 0){
            // console.log( "Resultado: " + result );
        }
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

//api/usuarios/updateusuario
usuarios.prototype.get_updateusuario = function( req, res, next ){
    var self = this;
    var usu_nombre      = req.query.usu_nombre;
    var usu_apellidoP   = req.query.usu_apellidoP;
    var usu_apellidoM   = req.query.usu_apellidoM;
    var usu_puesto      = req.query.usu_puesto;
    var usu_empresa     = req.query.usu_empresa;
    var usu_sucursal    = req.query.usu_sucursal;
    var usu_correo      = req.query.usu_correo;
    var CorreoId        = req.query.CorreoId;
    var usu_id          = req.query.usu_id;
   // console.log("Query", req.query);
    var params = [
        { name: 'usu_nombre',       value: usu_nombre, type: self.model.types.STRING },
        { name: 'usu_apellidoP',    value: usu_apellidoP, type: self.model.types.STRING },
        { name: 'usu_apellidoM',    value: usu_apellidoM, type: self.model.types.STRING },
        { name: 'usu_puesto',       value: usu_puesto, type: self.model.types.INT },
        { name: 'usu_empresa',      value: usu_empresa, type: self.model.types.INT },
        { name: 'usu_sucursal',     value: usu_sucursal, type: self.model.types.INT },
        { name: 'usu_correo',       value: usu_correo, type: self.model.types.STRING },
        { name: 'CorreoId',         value: CorreoId, type: self.model.types.STRING },
        { name: 'usu_id',           value: usu_id, type: self.model.types.STRING }
    ];

    this.model.query("Usuario_UpdUsuario_SP", params, function( error, result ){
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

//api/usuarios/updatepass
usuarios.prototype.get_updatepass = function( req, res, next ){
    var self      = this;
    var Pass      = req.query.Pass;
    var newPass   = req.query.newPass;
    console.log("Query", req.query);
    var params = [
        { name: 'Pass',       value: Pass, type: self.model.types.STRING },
        { name: 'newPass',    value: newPass, type: self.model.types.STRING }
    ];

    this.model.query("Usuario_UpdatePass_SP", params, function( error, result ){
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