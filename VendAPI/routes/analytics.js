var express = require('express');
var router = express.Router();

router.get('/revenue_pie', function(req, res, next) {
	var db = req.app.get('db');

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	var q = "SELECT item_name, sum(price) FROM logs GROUP BY item_name;";
	db.any(q).then(data => {
		res.json(data);
	}).catch(err => {
		console.log(err);
	});

});


router.get('/stock_table', function(req, res, next) {
	var db = req.app.get('db');

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	var q = "SELECT month, location, item_name, count(item_name) FROM stock_logs GROUP BY month, location, item_name;";
	db.any(q).then(data => {
		res.json(data);
	}).catch(err => {
		console.log(err);
	});

});
  

module.exports = router;
