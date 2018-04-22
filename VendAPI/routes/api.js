var express = require('express');
var router = express.Router();

// Load item into a machine's stock
router.post('/load', function(req, res, next) {
	var db = req.app.get('db');
	var machine_id = req.body.machine_id;
	var item_id = req.body.item_id;
	var month = req.body.month;
	db.none('INSERT INTO machine_stock (machine_id, item_id, month) VALUES ($1, $2, $3)', [machine_id, item_id, month]).then(() => {
		console.log('Inserted item ' + item_id + ' into machine ' + machine_id);
	}).catch(err => {
		console.log(err);
	});
	res.send(null);
});

module.exports = router;
