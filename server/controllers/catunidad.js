var CatUnView = require('../views/reference'),
    ModelView = require('../models/dataAccess'),
    fs = require("fs");

var catunidad = function(conf) {
    this.conf = conf || {};
    this.view = new CatUnView();
    this.model = new ModelView({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

//api/catunidad/unidadesnuevas
catunidad.prototype.get_unidadesnuevas = function( req, res, next ){
    var self = this;
    // var table = req.query.table;
    // console.log("Query", req.query);
    var params = [];

    this.model.query("CatUni_SELECT_SP", params, function( error, result ){
        // console.log(result);
        // console.log(error);
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

//api/catunidad/imgunidad
catunidad.prototype.get_imgunidad = function( req, res, next ){
    var self = this;
    var ci_IdCatUnidad = req.query.ci_IdCatUnidad;
    // console.log("Query", req.query);
    var params = [
        { name: 'ci_IdCatUnidad', value: ci_IdCatUnidad, type: self.model.types.INT }
    ];

    this.model.query("CatUni_SELECTImgById_SP", params, function( error, result ){
        // console.log(result);
        // console.log(error);
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// "api/catunidad/insertimagen"
catunidad.prototype.post_insertimagen = function(req, res, next) {
    //console.log( "Hola" );
    //console.log( req.body );
    var self = this;
    var ci_IdCatUnidad      = req.body.IdCatUnidad;
    var ci_RutaImagen       = req.body.imageInput.filename;
    var ci_IdTipoImagen     = req.body.tipoImg;
    // //console.log('QueryString = ' + req.query);

    var params = [
        { name: 'ci_IdCatUnidad',   value: ci_IdCatUnidad, type: self.model.types.INT },
        { name: 'ci_RutaImagen',    value: ci_RutaImagen, type: self.model.types.STRING },
        { name: 'ci_IdTipoImagen',  value: ci_IdTipoImagen, type: self.model.types.INT }
    ];
    //console.log( "Parametros", params );

    this.model.query('catImg_INSERT_SP', params, function (error, result) {
        //console.log('Parametros: ' + params);
        if (result.length > 0) {
            //var pathname = 'src/file/unidades/imgenes/' + req.body.imageInput.filename;
            var pathname = 'C:\\Users\\Laura-PC\\Documents\\NodeJs\\AndradeCMSDocumentos\\public\\images\\' + req.body.imageInput.filename;
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

// "api/catunidad/updateimagen"
catunidad.prototype.post_updateimagen = function(req, res, next) {
    //console.log( "Hola" );
    //console.log( req.body );
    var self = this;
    var ci_IdCatUnidad      = req.body.IdCatUnidad;
    var ci_RutaImagen       = req.body.imageInput.filename;
    var ci_IdTipoImagen     = req.body.tipoImg;
    var ci_IdImagen         = req.body.Idimg;
    // //console.log('QueryString = ' + req.query);

    var params = [
        { name: 'ci_IdCatUnidad',   value: ci_IdCatUnidad, type: self.model.types.INT },
        { name: 'ci_RutaImagen',    value: ci_RutaImagen, type: self.model.types.STRING },
        { name: 'ci_IdTipoImagen',  value: ci_IdTipoImagen, type: self.model.types.INT },
        { name: 'ci_IdImagen',      value: ci_IdImagen, type: self.model.types.INT }
    ];
    //console.log( "Parametros", params );

    this.model.query('catImg_UPDATE_SP', params, function (error, result) {
        //console.log('Parametros: ' + params);
        if (result.length > 0) {
            //var pathname = 'src/file/unidades/imgenes/' + req.body.imageInput.filename;
            var pathname = 'C:\\Users\\Laura-PC\\Documents\\NodeJs\\AndradeCMSDocumentos\\public\\images\\' + req.body.imageInput.filename;
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

//api/catunidad/fichaunidad
catunidad.prototype.get_fichaunidad = function( req, res, next ){
    var self = this;
    var caf_IdCatUnidad = req.query.caf_IdCatUnidad;
    // console.log("Query", req.query);
    var params = [
        { name: 'caf_IdCatUnidad', value: caf_IdCatUnidad, type: self.model.types.INT }
    ];

    this.model.query("CatUni_SELECTFichaById_SP", params, function( error, result ){
        // console.log(result);
        // console.log(error);
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

//api/catunidad/deleteimg
catunidad.prototype.get_deleteimg = function( req, res, next ){
    var self = this;
    var ci_IdCatUnidad  = req.query.ci_IdCatUnidad;
    var ci_IdImagen = req.query.ci_IdImagen
    // console.log("Query", req.query);
    var params = [
        { name: 'ci_IdCatUnidad',   value: ci_IdCatUnidad, type: self.model.types.INT },
        { name: 'ci_IdImagen',      value: ci_IdImagen, type: self.model.types.INT }
    ];

    this.model.query("catImg_DELETE_SP", params, function( error, result ){
        // console.log(result);
        // console.log(error);
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// "api/catunidad/insertficha"
catunidad.prototype.post_insertficha = function(req, res, next) {
    //console.log( "Hola" );
    //console.log( req.body );
    var self = this;
    var caf_idCatUnidad   = req.body.caf_idCatUnidad;
    var caf_RutaFicha     = req.body.FichaInput.filename;
    var caf_IdTipoImages  = req.body.tipo;
    // //console.log('QueryString = ' + req.query);

    var params = [
        { name: 'caf_idCatUnidad',   value: caf_idCatUnidad, type: self.model.types.INT },
        { name: 'caf_RutaFicha',     value: caf_RutaFicha, type: self.model.types.STRING },
        { name: 'caf_IdTipoImages',  value: caf_IdTipoImages, type: self.model.types.INT }
    ];
    // console.log( "Parametros", params );

    this.model.query('CatFic_INSERT_SP', params, function (error, result) {
        if (result.length > 0) {
            //var pathname = 'src/file/unidades/imgenes/' + req.body.imageInput.filename;
            var pathname = 'C:\\Users\\Laura-PC\\Documents\\NodeJs\\AndradeCMSDocumentos\\public\\fichas\\' + req.body.FichaInput.filename;
            require("fs").writeFile( pathname , req.body.FichaInput.value, 'base64', function(err) {
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

// "api/catunidad/updateficha"
catunidad.prototype.post_updateficha = function(req, res, next) {
    //console.log( "Hola" );
    //console.log( req.body );
    var self = this;
    var caf_idFicha         = req.body.idFicha;
    var caf_idCatUnidad     = req.body.caf_idCatUnidad
    var caf_RutaFicha       = req.body.FichaInput.filename;
    var caf_IdTipoImages    = req.body.tipo;
    // //console.log('QueryString = ' + req.query);

    var params = [
        { name: 'caf_idFicha',          value: caf_idFicha, type: self.model.types.INT },
        { name: 'caf_idCatUnidad',      value: caf_idCatUnidad, type: self.model.types.INT },
        { name: 'caf_RutaFicha',        value: caf_RutaFicha, type: self.model.types.STRING },
        { name: 'caf_IdTipoImages',     value: caf_IdTipoImages, type: self.model.types.INT }
    ];
    console.log( "Parametros", params );

    this.model.query('CatFic_UPDATE_SP', params, function (error, result) {
        if (result.length > 0) {
            //var pathname = 'src/file/unidades/imgenes/' + req.body.imageInput.filename;
            var pathname = 'C:\\Users\\Laura-PC\\Documents\\NodeJs\\AndradeCMSDocumentos\\public\\fichas\\' + req.body.FichaInput.filename;
            require("fs").writeFile( pathname , req.body.FichaInput.value, 'base64', function(err) {
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

//api/catunidad/deleteficha
catunidad.prototype.get_deleteficha = function( req, res, next ){
    var self = this;
    var caf_idFicha     = req.query.caf_idFicha;
    var caf_idCatUnidad = req.query.caf_idCatUnidad
    // console.log("Query", req.query);
    var params = [
        { name: 'caf_idFicha',      value: caf_idFicha, type: self.model.types.INT },
        { name: 'caf_idCatUnidad',  value: caf_idCatUnidad, type: self.model.types.INT }
    ];

    this.model.query("CatFicha_DELETE_SP", params, function( error, result ){
        // console.log(result);
        // console.log(error);
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = catunidad;