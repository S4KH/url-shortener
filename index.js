var express = require("express")
var db = require("./db/urls")
var validator = require("./validator.js")
var mongoose = require("mongoose")
var url = mongoose.model("urls")
var app = express()

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Root route
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html')
})

// Url shortener
app.get('/new/:url', function(req, res){
    var userUrl = req.params.url
    if(validator.validate(userUrl)){
        new url({
            original_url: userUrl
        }).save(function(error, url){
            console.log(url)
            res.json(url)
        })
    }else{
        res.json({"error":"URL invalid"})
    }
    // Saving the url

})

var port = process.env.PORT || 8081;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

