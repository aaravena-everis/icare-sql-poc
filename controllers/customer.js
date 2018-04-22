var db 			= require('../config/db.js');
var response 	= require('../config/utils');

exports.getCustomers = function(req, res) {
  db.get().query('SELECT * FROM customer', function (error, results, fields) {
    if (error) throw res.status(500).jsonp(response.errorResponse(500,"ERROR", error.message));
    res.status(200).jsonp(response.successfulResponse("Listando", results));
  })
}

exports.addCustomer = function (req, res) {
   var params  = req.body;
   db.get().query('INSERT INTO customer SET ?', params, function (error, results, fields) {
	  if (error) throw res.status(500).jsonp(response.errorResponse(500,"ERROR", error.message));
	  res.status(200).jsonp(response.successfulResponse("Agregado Correctamente", results));
	});
}

exports.updateCustomer = function (req, res) {
   db.get().query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', [req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id], function (error, results, fields) {
	  if (error) throw res.status(500).jsonp(response.errorResponse(500,"ERROR", error.message));
	  res.status(200).jsonp(response.successfulResponse("Actualizado Correctamente", results));
	});
}

exports.delCustomer = function (req, res) {
   db.get().query('DELETE FROM `customer` WHERE `Id`=?', [req.body.Id], function (error, results, fields) {
	  if (error) throw res.status(500).jsonp(response.errorResponse(500,"ERROR", error.message));
	  res.status(200).jsonp(response.successfulResponse("Eliminado Correctamente", results));
	});
}