var SemiNuevoView = require('../views/reference'),
    ModelView = require('../models/dataAccess'),
    fs = require("fs");

var seminuevo = function(conf) {
    this.conf = conf || {};
    this.view = new SemiNuevoView();
    this.model = new ModelView({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

//api/seminuevo/seminuevo
seminuevo.prototype.get_seminuevo = function( req, res, next ){
    var self = this;
    // var table = req.query.table;
    // console.log("Query", req.query);
    var params = [];

    this.model.query("InvSemi_SELECT_SP", params, function( error, result ){
        // console.log(result);
        // console.log(error);
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

//api/seminuevo/imgsemi
seminuevo.prototype.get_imgsemi = function( req, res, next ){
    var self = this;
    var cis_IdSeminuevo = req.query.cis_IdSeminuevo;
    // console.log("Query", req.query);
    var params = [
        { name: 'cis_IdSeminuevo', value: cis_IdSeminuevo, type: self.model.types.INT }
    ];

    this.model.query("InvSem_SELECTImgById_SP", params, function( error, result ){
        // console.log(result);
        // console.log(error);
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// "api/seminuevo/insertimagensemi"
seminuevo.prototype.post_insertimagensemi = function(req, res, next) {
    //console.log( "Hola" );
    //console.log( req.body );
    var self = this;
    var cis_IdSeminuevo    = req.body.IdSemi;
    var cis_TipoImagen     = req.body.tipoImg;
    // //console.log('QueryString = ' + req.query);

    //Variables para guardar la imagen
    var rutaSave    = req.body.rutaTxt;
    var prefijo     = req.body.prefijoTxt;
    var txtTipoImg  = req.body.tipoImgtxt;

    var params = [
        { name: 'cis_IdSeminuevo',      value: cis_IdSeminuevo, type: self.model.types.INT },
        { name: 'cis_TipoImagen',       value: cis_TipoImagen, type: self.model.types.INT }
    ];
    //console.log( "Parametros", params );

    this.model.query('catImgSemi_INSERT_SP', params, function (error, result) {
        console.log("error",error);
        console.log("result",result);
        if (result.length > 0) {
            //var pathname = 'src/file/unidades/imgenes/' + req.body.imageInput.filename;
            var newName = prefijo + cis_idImagenSemi + "_" + result[0].consImagen + txtTipoImg;
            console.log( "newName", newName );
            var pathname = rutaSave + newName;
            console.log( "pathname", pathname );
            require("fs").writeFile( pathname , req.body.imageInput.value, 'base64', function(err) {
                //console.log(err);
                if( err ){
                    console.log('Ha ocurrido un error: ' + err);
                }
                else{
                    console.log('Se ha guardado');
                }
            });
         //console.log("resultaaaaaaa " + result[0]);
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// "api/seminuevo/updateimagensemi"
seminuevo.prototype.post_updateimagensemi = function(req, res, next) {
    //console.log( "Hola" );
    //console.log( req.body );
    var self = this;
    var cis_IdSeminuevo     = req.body.IdSemi;
    var cis_TipoImagen      = req.body.tipoImg;
    var cis_RutaImagen      = req.body.imageInput.filename;
    var cis_idImagenSemi    = req.body.Idimg;
    var tipoImgtxt          = req.body.tipoImgtxt;
    // //console.log('QueryString = ' + req.query);

    var params = [
        { name: 'cis_IdSeminuevo',   value: cis_IdSeminuevo, type: self.model.types.INT },
        { name: 'cis_TipoImagen',    value: cis_TipoImagen, type: self.model.types.INT },
        { name: 'cis_RutaImagen',    value: cis_RutaImagen, type: self.model.types.STRING },
        { name: 'cis_idImagenSemi',  value: cis_idImagenSemi, type: self.model.types.INT },
        { name: 'tipoImgtxt',        value: tipoImgtxt, type: self.model.types.STRING }
    ];
    console.log( "Parametros", params );

    this.model.query('catImgSemi_UPDATE_SP', params, function (error, result) {
        console.log( "error",error );
        console.log( "result",result );
        if (result.length > 0) {
            //var pathname = 'src/file/unidades/imgenes/' + req.body.imageInput.filename;
            var newName = result[0].semiName
            var pathname = pathSaveSemi + newName;
            require("fs").writeFile( pathname , req.body.imageInput.value, 'base64', function(err) {
                //console.log(err);
                if( err ){
                    console.log('Ha ocurrido un error: ' + err);
                }
                else{
                    console.log('Se ha guardado');
                }
            });
         //console.log("resultaaaaaaa " + result[0]);
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

//api/seminuevo/deleteimgsemi
seminuevo.prototype.get_deleteimgsemi = function( req, res, next ){
    var self = this;
    var cis_IdSeminuevo  = req.query.cis_IdSeminuevo;
    var cis_idImagenSemi = req.query.cis_idImagenSemi
    // console.log("Query", req.query);
    var params = [
        { name: 'cis_IdSeminuevo',  value: cis_IdSeminuevo, type: self.model.types.INT },
        { name: 'cis_idImagenSemi', value: cis_idImagenSemi, type: self.model.types.INT }
    ];

    this.model.query("catImgSemi_DELETE_SP", params, function( error, result ){
        // console.log(result);
        // console.log(error);
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = seminuevo;