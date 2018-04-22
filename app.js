var http 			= require("http");
var express 		= require('express');
var app 			= express();
var mysql      		= require('mysql');
var bodyParser 		= require('body-parser');
var methodOverride 	= require('method-override');

var db 			   	= require('./config/db.js')
var configWEB      	= require('./config/configWEB');
var port           	=  configWEB.web.port

// Middlewares
var allowCrossDomain = function(req, res, next) {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
 res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
 if ('OPTIONS' == req.method)res.sendStatus(200);else next();
};

//Body-parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(allowCrossDomain);
app.use(methodOverride());

db.connect(function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {
  	console.log('Connect to MySQL database')
  }
})

var api = express.Router();
api.get('/', function(req, res) {
 res.send('<html><body></body></html>');
});

app.use(api);

//CONTROLLERS
var customerCtrl = require('./controllers/customer');

var enVivoCtrl = require('./controllers/en-vivo')

// API routes
app.use('/api', api);
api.route('/customer').get(customerCtrl.getCustomers);
api.route('/customer/add').post(customerCtrl.addCustomer);
api.route('/customer/update').put(customerCtrl.updateCustomer);
api.route('/customer/delete').delete(customerCtrl.delCustomer);

//EN VIVO
api.route('/en-vivo').get(enVivoCtrl.getAllEnVivo);

//Servidor nodeJS
app.listen(port, function() {
 console.log("Node server running on port " + port);
});