var subdomain 	= require('express-subdomain');
var express 	  = require('express');
var app 		     = express();


var router = express.Router();
 
app.use(subdomain('api.vendlyz', router));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

//api specific routes 
router.get('/', function(req, res) {
    res.send('Welcome to our API!');
});
 
router.get('/users', function(req, res) {
    res.json([
        { name: "Brian" }
    ]);
});

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});