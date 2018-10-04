var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var request = require('request');
var cheerio = require('cheerio');

//Mongodb database name & collections
var databaseUrl = "scrapedhomework";
var collections = ["newsData", "savedNews"];
//accessing the mongodb database
var db = mongojs(databaseUrl, collections);
// If there is a database error
db.on("error", function(error) {
  console.log("Database Error:", error);
});

router.get('/', function(req, res){
	res.render('pages/index');
});

module.exports = router;