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

//Scrapes from the onion page
router.get('/scrape', function(req, res){
	request('https://www.theonion.com/', function(err, response, html){
		var $ = cheerio.load(html);

		var results = [];

		$('article').each(function(i, element){
			var title = $(element).children('header').children('h1').text();
			var link = $(element).children('header').children('h1').children('a').attr('href');
			var summary = $(element).children('div.item__content').children('.entry-summary').children('p').text();
			var image = $(element).children('.item__content').children('figure').children('a').children('.img-wrapper').children('picture').children('source').data('srcset');

			if(title && link && summary && image){
				db.newsData.insert({
					title: title,
					link: link,
					summary: summary,
					image: image
				}, function(err, inserted){
					if(err){
						 console.log(err);
					}else{
						console.log(inserted);
					}
				});
			}
		});

		res.send("Scrape Completed");
	});
});

//News Data from database
router.get('/all', function(req, res){
	db.newsData.find({}, function(err, data){
		if(err) {
			console.log(err);
		} else{
			res.json(data);
		}
	});
});

//Add news to favorite
router.post('/save-news', function(req, res){
	db.savedNews.insert(req.body, function(err, saved){
		if(err){
			console.log(err);
		}else {
			res.send(saved);
		}
	});
});

module.exports = router;