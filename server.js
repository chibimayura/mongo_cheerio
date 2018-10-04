var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

var mongojs = require('mongojs');
var request = require('request');
var cheerio = require('cheerio');

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Mongodb database name & collections
var databaseUrl = "scrapedhomework";
var collections = ["newsData", "savedNews"];
//accessing the mongodb database
var db = mongojs(databaseUrl, collections);

// If there is a database error
db.on("error", function(error) {
  console.log("Database Error:", error);
});

//News-Scraper Route
var newsRoute = require('./routes/news_scraper');
app.use('/', newsRoute);

//Saved-News Routes
var savedRoute = require('./routes/saved-news');
app.use('/saved-news', savedRoute)

app.listen(3000, function(){
	console.log('Listening on PORT 3000');
});