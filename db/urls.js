var mongoose = require("mongoose")
var autoIncrement = require('mongoose-auto-increment') // Used for auto incrementing the '_id' field
var Schema = mongoose.Schema

var connection = mongoose.createConnection("mongodb://localhost:27017/urlshortener");
 
autoIncrement.initialize(connection);

var Urls = new Schema({
    original_url: String
})

Urls.plugin(autoIncrement.plugin, 'urls')
mongoose.model('urls', Urls)