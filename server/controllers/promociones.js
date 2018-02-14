var PromoView = require('../views/reference'),
ModelView = require('../models/dataAccess'),
fs = require("fs");

var pathSave = "C:\\Desarrollo\\AndradeCMSDocumentos\\public\\promociones\\";
var prefijoPromo = "Promo_";

var promociones = function(conf) {
    this.conf = conf || {};
    this.view = new PromoView();
    this.model = new ModelView({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
}    

promociones.prototype.get_promociones = function( req, res, next ){
    var self = this;
    // var table = req.query.table;
    // console.log("Query", req.query);
    var params = [];

    this.model.query("Promo_GetPromociones_SP", params, function( error, result ){
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

//api/promociones/empresas
promociones.prototype.get_empresas = function( req, res, next ){
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

//api/promociones/tipopromocion
promociones.prototype.get_tipopromocion = function( req, res, next ){
    var self = this;
    // var table = req.query.table;
    // console.log("Query", req.query);
    var params = [];

    this.model.query("TPromo_GetTipoPromocion_SP", params, function( error, result ){
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

// "api/promociones/marca"
promociones.prototype.get_marca = function(req, res, next) {
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

// "api/promociones/sucursal"
promociones.prototype.get_sucursal = function(req, res, next) {
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

// "api/promociones/getpromocionbyid"
promociones.prototype.get_getpromocionbyid = function(req, res, next) {
    var self = this;
    var promoId = req.query.promoId;
    //console.log('QueryString = ' + req.query);

    var params = [
        { name: 'promoId', value: promoId, type: self.model.types.INT }
    ];

    this.model.query('Promo_GetPromocionById_SP', params, function (error, result) {
        //console.log('Parametros: ' + params);
        if (result.length > 0) {
            // console.log("resultaaaaaaa " + result[0]);
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// "api/promociones/updatepromocion"
promociones.prototype.get_updatepromocion = function(req, res, next) {
    var self = this;
    var po_IdTipoPromocion = req.query.po_IdTipoPromocion;
    var po_idEmpresa = req.query.po_idEmpresa;
    var po_IdSucursal = req.query.po_IdSucursal;
    var po_IdMarca = req.query.po_IdMarca;
    var po_Descripcion = req.query.po_Descripcion;
    //var po_RutaImagen = req.query.po_RutaImagen;
    var po_IdUsuario = req.query.po_IdUsuario;
    var po_IdPromocion = req.query.po_IdPromocion;
    //console.log('QueryString = ' + JSON.stringify(req.query));

    var params = [
        { name: 'po_IdTipoPromocion', value: po_IdTipoPromocion, type: self.model.types.INT },
        { name: 'po_idEmpresa', value: po_idEmpresa, type: self.model.types.INT },
        { name: 'po_IdSucursal', value: po_IdSucursal, type: self.model.types.INT },
        { name: 'po_IdMarca', value: po_IdMarca, type: self.model.types.INT },
        { name: 'po_Descripcion', value: po_Descripcion, type: self.model.types.STRING },
        //{ name: 'po_RutaImagen', value: po_RutaImagen, type: self.model.types.STRING },
        { name: 'po_IdUsuario', value: po_IdUsuario, type: self.model.types.INT },
        { name: 'po_IdPromocion', value: po_IdPromocion, type: self.model.types.INT }
    ];

    this.model.query('Promo_UpdatePromocion_SP', params, function (error, result) {
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

// "api/promociones/deletepromociones"
promociones.prototype.get_deletepromociones = function(req, res, next) {
    var self = this;
    var promoId = req.query.promoId;
    //console.log('QueryString = ' + req.query);

    var params = [
        { name: 'promoId', value: promoId, type: self.model.types.INT }
    ];

    this.model.query('Promo_DeletePromocion_SP', params, function (error, result) {
       // console.log('Parametros: ' + params);
        if (result.length > 0) {

         //console.log("resultaaaaaaa " + result[0]);
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// "api/promociones/insertpromocion"
promociones.prototype.post_insertpromocion = function(req, res, next) {
    // console.log( req.body.imageInput.value );
    var self = this;
    var po_IdTipoPromocion  = req.body.SelectTipoPromocion;
    var po_idEmpresa        = req.body.SelectEmpresa;
    var po_IdSucursal       = req.body.SelectSucursal;
    var po_IdMarca          = req.body.SelectMarca;
    var po_Descripcion      = req.body.TxtDescripcion;
    var po_RutaImagen       = req.body.imageInput.filename;
    var po_IdUsuario        = req.body.idUsuario;
    var po_tipo             = req.body.typeImg;
    //console.log('QueryString = ' + req.query);

    var params = [
        { name: 'po_IdTipoPromocion',   value: po_IdTipoPromocion, type: self.model.types.INT },
        { name: 'po_idEmpresa',         value: po_idEmpresa, type: self.model.types.INT },
        { name: 'po_IdSucursal',        value: po_IdSucursal, type: self.model.types.INT },
        { name: 'po_IdMarca',           value: po_IdMarca, type: self.model.types.INT },
        { name: 'po_Descripcion',       value: po_Descripcion, type: self.model.types.STRING },
        { name: 'po_RutaImagen',        value: po_RutaImagen, type: self.model.types.STRING },
        { name: 'po_IdUsuario',         value: po_IdUsuario, type: self.model.types.INT },
        { name: 'po_tipo',              value: po_tipo, type: self.model.types.STRING }
    ];

    this.model.query('Promo_InsertPromocion_SP', params, function (error, result) {
        console.log("Result",result);
        console.log("Error",error);
        console.log("ResultImg",result[0].imgName);
        if (result.length > 0) {
            var newName = result[0].imgName;
            var pathname = pathSave + newName;
            //var pathname = 'src/file/promociones/' + req.body.imageInput.filename;
            require("fs").writeFile( pathname , req.body.imageInput.value, 'base64', function(err) {
                console.log(err);
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

//api/promociones/updateimage
promociones.prototype.post_updateimage = function(req, res, next){
    //console.log( req.body.imageInputUpdate.filename );
    var self = this;
    var po_RutaImagen = prefijoPromo + req.body.promoIdUp + req.body.typeImgUp;
    var po_IdPromocion = req.body.promoIdUp;
    console.log( "TipoImagen", req.body.typeImgUp );
    console.log("RutaImg", po_RutaImagen);
    var params = [
        { name: 'po_RutaImagen',   value: po_RutaImagen, type: self.model.types.STRING },
        { name: 'po_IdPromocion',  value: po_IdPromocion, type: self.model.types.INT }
    ];
    this.model.query('Promo_UpdateImgPromo_SP', params, function (error, result) {
        //console.log('Parametros: ' + params);
        if (result.length > 0) {
            var newName = prefijoPromo + po_IdPromocion
            var pathname = pathSave + newName;
            //var pathname = 'src/file/promociones/' + req.body.imageInputUpdate.filename;
            require("fs").writeFile( pathname , req.body.imageInputUpdate.value, 'base64', function(err) {
                if( err ){
                    console.log('Ha ocurrido un error: ' + err);
                }
                else{
                    console.log('Se ha guardado');
                }
            }); 
        }else{
            console.log(error)
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
   
}

module.exports = promociones;