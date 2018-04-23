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

router.get('/revenue_pie_by_loc/:loc', function(req, res, next) {
	var db = req.app.get('db');
	var loc = req.params.loc;

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	var q = "SELECT item_name, sum(price) FROM logs where location = '" + loc +  "' GROUP BY item_name;";
	db.any(q).then(data => {
		res.json(data);
	}).catch(err => {
		console.log(err);
	});

});
  
router.get('/stock_table_by_loc/:loc', function(req, res, next) {
	var db = req.app.get('db');
	var loc = req.params.loc;

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	var q = "SELECT month, location, item_name, count(item_name) FROM stock_logs WHERE location = '" + loc + "' GROUP BY month, location, item_name ORDER BY month desc;";
	db.any(q).then(data => {
		console.log(data);
		res.json(data);
	}).catch(err => {
		console.log(err);
	});

});

// Future data points
// var q1 = 'select item_name, count(item_name) from purchase_prediction, item where month >= 37 and purchase_prediction.item_id = item.id group by item_name;'
  
  
// Last 2 months data points
// var q2 = 'select item_name, count(item_name) from purchase, item where month >= 35 and month <= 36 and purchase.item_id = item.id group by item_name;'

module.exports = router;
