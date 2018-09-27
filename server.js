var express = require('express');
var app = express();
app.set('view engine', 'ejs');

var mongojs = require('mongojs');
var request = require('request');
var cheerio = require('cheerio');

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Mongodb database name & collections
var databaseUrl = "scrapedhomework";
var collections = ["findings"];
//accessing the mongodb database
var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get('/', function(req, res){
	res.render('pages/index');
});

