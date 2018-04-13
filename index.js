var http 			= require("http");
var express 		= require('express');
var app 			= express();
var mysql      		= require('mysql');
var bodyParser 		= require('body-parser');
var compression 	= require('compression');
var methodOverride 	= require('method-override');

// Middlewares
var allowCrossDomain = function(req, res, next) {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
 res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
 if ('OPTIONS' == req.method)res.sendStatus(200);else next();
};

//Body-parse
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(compression());
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//Servidor nodeJS
var server = app.listen(process.env.PORT || 3000, "0.0.0.0", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Ejemplo de app ejecutandose en http://%s:%s", host, port)

});

//Conexión a SQL
var connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-05.cleardb.net',
  user     : 'b0b485ece04372',
  password : '7f5c4134',
  database : 'heroku_274f3b780ac622f'
});


connection.connect(function(err) {
  if (err) throw err
  console.log('Estas conectado a la base de datos')
})

//EJEMPLO DE SELECT -- GET
//rest api to get all customers
app.get('/customer', function (req, res) {
   connection.query('select * from customer', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//EJEMPLO DE INSERT -- POST
//rest api to create a new customer record into mysql database
app.post('/customer', function (req, res) {
   var params  = req.body;
   console.log(params);
   connection.query('INSERT INTO customer SET ?', params, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//EJEMPLO DE UPDATE -- PUT
app.put('/customer', function (req, res) {
   connection.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', [req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//EJEMPLO DELETE -- DELETE
//rest api to delete record from mysql database
app.delete('/customer', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `customer` WHERE `Id`=?', [req.body.Id], function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
});