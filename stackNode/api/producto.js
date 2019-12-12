const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');

var mysql = require('mysql');
//Conectando con MySql
var con = mysql.createConnection({
  host: "localhost",
  user: "usuario",
  password: "contraseña",
  database: "base de datos"
});

router.post('/', function(req, res) {
  var producto = req.body.producto || ''
  if (producto!='') {
    	var registro  = req.body;
    	//console.log(registro);

		con.query('INSERRT INTO venta SET ?', registro, function(err, result) {
		  // Neat!
		  if (err) {
	            console.log(err.message);
              res.json({res:false});
	        } else {
	            console.log('Registro insertado con exito');
              res.json({res:true});
	        }
		});
    } 
    else {
    	res.status(400).end()
  	}
    //res.redirect('http://localhost:3000');
    //res.status(500);
  });

router.route('/:id')
  .get(function(req, res) {
    //Búsqueda únicamente por el id (que viene como parte de la ruta)
    con.query("SELECT * FROM ventas WHERE id="+req.params.id, function (err, result, fields) {
      if (err)
        res.status(500);
      else
        res.json(result);
    });
  })
  .put(function(req, res) {
    console.log('Update '+req.body.importe);

    var prodId = req.params.id;
    var produ = req.body.producto;
    var prec = req.body.precio;
    var cant = req.body.cantidad;
    var impor = req.body.importe;

    //console.log(req.body);

    if (prodId>0) {
        var registro  = req.body;
        //console.log(registro);

      con.query('UPDATE ventas SET producto=?, cantidad=?, precio=?, importe=?  WHERE id = ?', [produ,cant,prec,impor,prodId], function(err, result) {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Registro actualizado con exito');
            res.json({res:true});
        }
      });
      } 
      else {
        res.status(400).end()
      }
  })
  .delete(function(req, res) {
    console.log('DeleteX '+ req.params.id);
    idDelete = req.params.id;

    if(idDelete>0){
      con.query("DELETE venta WHERE id_venta = ?", idDelete, function(err,results){
          if (err)
            res.status(500);
          else
            res.json({res:true});
      });
    }else{
      res.status(400).end()
    }
  })

module.exports=router;
