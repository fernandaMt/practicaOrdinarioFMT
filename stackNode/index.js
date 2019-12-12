const express=require("express");
const body_parser = require('body-parser');
const app=express();

app.use(body_parser.urlencoded({extended:true}));

var rutaProducto = require('./api/producto.js');

//MySql
var mysql = require('mysql');

//Conectando con MySql
var con = mysql.createConnection({
  host: "localhost",
  user: "usuario",
  password: "contraña",
  database: "basededatos"
});

//usando framework ejs
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    con.query("SELECT * FROM ventas", function (err, result, fields) {
    if (err) throw err;
    resultado = result;
    console.log(resultado,typeof resultado);
    //Renderiza el resultado en la vista y todo lo de mas
    res.render(__dirname+'/views/index', { title: 'App Web NodeJs & MySql', message: 'Hola mundo!!!', datos:Array.from(resultado)})  
  }); 
})

//Poner listas las api's para su uso en cualquier parte
app.use('/api/producto',rutaProducto);

app.listen(3000,()=>{
	console.log('Servidor levantado :D');
})