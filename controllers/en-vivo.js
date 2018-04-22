var db 			= require('../config/db.js');
var response 	= require('../config/utils');
var http 			= require("http");
var htmlparser 	= require('../config/html-parser');

exports.getAllEnVivo = function(req, res) {
  db.get().query("SELECT * FROM 1c4r3_posts WHERE post_type='en-vivo' order by post_date DESC", function (error, results, fields) {
    if (error) throw res.status(500).jsonp(response.errorResponse(500,"ERROR", error.message));

    var fecha_actual = new Date();
    var month = fecha_actual.getMonth()+1;
    var day = fecha_actual.getDate();
    var year = fecha_actual.getFullYear();
    var hoy = month + '-' + day + '-' + year;

    var fecha_streaming = new Date(results[0]['post_date']);
    var months = fecha_streaming.getMonth()+1;
    var days = fecha_streaming.getDate();
    var years = fecha_streaming.getFullYear();
    var fecha_strm = months + '-' + days + '-' + years;

    var url_base_html = results[0]['guid'].split(';');
    var url_html = 'http://www.icare.cl/?' + url_base_html[1];

    var query = {
      url: 'www.icare.cl/?' + url_base_html[1]
    };

    /*
    http.get(options, function(res) {
      console.log("Got response: " + res.statusCode);
      htmlparser.processResponse(res, function (respu) {
      	console.log(respu)
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
*/
	router.get("/fetch", htmlparser.htmlParseHTMLfromURL(query, function(respu) { console.log(respu)}));

    var respuesta = {
    	url: url_html,
    	fecha_actual: hoy,
    	fecha_streaming: fecha_strm
    }

    console.log(respuesta)

    res.status(200).jsonp(response.successfulResponse("Listando", results[0]));
  })
}