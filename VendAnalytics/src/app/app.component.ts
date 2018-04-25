import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
	title = 'app';
	dash_flag;
	dist_flag;
	revenues;
	stocks;
	dists;

	constructor(private http: HttpClient) {} 

	ngOnInit() {
		this.dash_flag = true;
		this.dist_flag = false;
		this.revenues = [];
		this.stocks = [];
		this.dists = [];
		this.revenuePie();
		this.stockTable();
		this.old_histogram();
		this.new_histogram();
	}

	dash() {
		this.dash_flag = true;
		this.dist_flag = false;
		this.revenuePie();
		this.stockTable();
		this.old_histogram();
		this.new_histogram();
	}

	dist() {
		this.dash_flag = false;
		this.dist_flag = true;
		this.distributions();
	}

	reset() {
		this.revenuePie();
		this.stockTable();
	}

	search(query) {
		var pie_url = 'http://localhost:3000/analytics/revenue_pie_by_loc/' + query;
		this.http.get(pie_url).subscribe(rows => {

			var values = [];
			var labels = [];
			var count = 0;
			for (var row in rows) {
				values.push(rows[row]['sum']);
				labels.push(rows[row]['item_name']);
				count += 1;
			}

			var title = 'Stock Distribution by Item at ' + query;
			var data = [{ values: values, labels: labels, type: 'pie', hole:0.4 }];
			var layout = { title: title, height: 600, width: 800, paper_bgcolor:'white', margin: { pad: 100 } };

			Plotly.newPlot('pie_chart', data, layout);
		});

		var table_url = 'http://localhost:3000/analytics/stock_table_by_loc/' + query;
		this.http.get(table_url).subscribe(rows => {
			
			var months = [];
			var locations = [];
			var item_names = [];
			var counts = [];
			for (var row in rows) {
				months.push(rows[row]['month']);
				locations.push(rows[row]['location']);
				item_names.push(rows[row]['item_name']);
				counts.push(rows[row]['count']);
			};

			var rows_data = [ months, locations, item_names, counts ];

			var data = [{
				type: 'table',
				header: {
					values: [["Month"], ["Location"], ["Item Name"], ["Count"]],
					align: "center",
					line: {width: 1, color: 'black'},
					fill: {color: "#FFB136"},
					font: {family: "Helvetica", size: 16, color: "black"}
				},
				cells: {
					values: rows_data,
					align: "center",
					line: {color: "black", width: 1},
					font: {family: "Helvetica", size: 13, color: ["black"]}
				}
			}]
			
			var title = 'Item Stocks at ' + query;
			var layout = { title: title, height: 600, width: 800, paper_bgcolor:'white', margin: { pad: 0 } };
			Plotly.newPlot('stock_table', data, layout);

		});
	}

	revenuePie() {

		var url = 'http://localhost:3000/analytics/revenue_pie';
		this.http.get(url).subscribe(rows => {

			var values = [];
			var labels = [];
			var count = 0;
			for (var row in rows) {
				values.push(rows[row]['sum']);
				labels.push(rows[row]['item_name']);
				count += 1;
			}

			var data = [{ values: values, labels: labels, type: 'pie', hole:0.4 }];
			this.revenues = data;
			this.showRevenuePie();
		});
	}

	showRevenuePie() {
		var layout = { title:'Stock Distribution by Item', height: 600, width: 800, paper_bgcolor:'white', margin: { pad: 100 } };
		Plotly.newPlot('pie_chart', this.revenues, layout);
	}

	stockTable() {

		var url = 'http://localhost:3000/analytics/stock_table';
		this.http.get(url).subscribe(rows => {
			
			var months = [];
			var locations = [];
			var item_names = [];
			var counts = [];
			for (var row in rows) {
				months.push(rows[row]['month']);
				locations.push(rows[row]['location']);
				item_names.push(rows[row]['item_name']);
				counts.push(rows[row]['count']);
			};

			var rows_data = [ months, locations, item_names, counts ];

			var data = [{
				type: 'table',
				header: {
					values: [["Month"], ["Location"], ["Item Name"], ["Count"]],
					align: "center",
					line: {width: 1, color: 'black'},
					fill: {color: "#FFB136"},
					font: {family: "Helvetica", size: 16, color: "black"}
				},
				cells: {
					values: rows_data,
					align: "center",
					line: {color: "black", width: 1},
					font: {family: "Helvetica", size: 13, color: ["black"]}
				}
			}]
			
			this.stocks = data;
			this.showStockTable();
		});

	}

	showStockTable() { 
		var layout = { title: 'Item Stocks', height: 600, width: 800, paper_bgcolor:'white', margin: { pad: 100 } };
		Plotly.newPlot('stock_table', this.stocks, layout);
	}

	old_histogram() {

		var old_url = 'http://localhost:3000/analytics/old_histogram';
		this.http.get(old_url).subscribe(rows => {

			var x = []; var y = [];
			for (var row in rows) {
				x.push(rows[row]['item_name']);
				y.push(rows[row]['count']);
			}

			var trace1 = { histfunc: "sum", y: y, x: x, type: "histogram", marker: { color: "#FFB136" }, opacity: 0.75, name: "old" };
			var data = [trace1];
			var layout = { title: 'Purchase Count by Item', height: 600, width: 800, paper_bgcolor:'white', margin: { pad: 0 } };
			Plotly.newPlot('old_histogram', data, layout);

		});

	}

	new_histogram() {

		var new_url = 'http://localhost:3000/analytics/new_histogram';
		this.http.get(new_url).subscribe(rows => {

			var x = []; var y = [];
			for (var row in rows) {
				x.push(rows[row]['item_name']);
				y.push(rows[row]['count']);
			}

			var trace1 = { histfunc: "sum", y: y, x: x, type: "histogram", marker: { color: "#FFB136" }, opacity: 0.75, name: "new" };
			var data = [trace1];
			var layout = { title: 'Predicted Purchase Count by Item', height: 600, width: 800, paper_bgcolor:'white', margin: { pad: 0 } };
			Plotly.newPlot('new_histogram', data, layout);

		});

	}

	distributions() {

		var new_url = 'http://localhost:3000/analytics/distribution/';
		this.http.get(new_url).subscribe(rows => {

			var data = [];
			var count = 0;
			for (var row in rows) {
				var item_name = rows[row]['item_name'];
				var item_id = rows[row]['item_id'];
				var timestamp = rows[row]['timestamp_val'];
				var density = rows[row]['density_val'];

				if (data.length === 0) {
					data.push({ 'name': item_name, 'id': item_id, 'timestamps': [], 'densities': [] });
					data[count]['timestamps'].push(timestamp);
					data[count]['densities'].push(density);
				} else if (data[count]['name'] === item_name) {
					data[count]['timestamps'].push(timestamp);
					data[count]['densities'].push(density);
				} else {
					data.push({ 'name': item_name, 'id': item_id, 'timestamps': [], 'densities': [] });
					data[count]['timestamps'].push(timestamp);
					data[count]['densities'].push(density);
					count += 1;
				}

			}

			this.dists = data;
			this.showDistributions();
		});

	}

	showDistributions() {

		this.dists.forEach(data_obj => {
			var div_name = 'dist_' + data_obj['id'];
			var x = data_obj['timestamps'];
			var y = data_obj['densities'];
			var trace = { histfunc: "sum", x: x, y: y, type: "histogram", marker: { color: "#FFB136" }, opacity: 0.75, };
			var data = [trace];
			var title = 'Average ' + data_obj['name'] + ' Distribution';
			var layout = { title: title, height: 250, width: 350, paper_bgcolor:'white', margin: { pad: 0 } };
			Plotly.newPlot(div_name, data, layout);
		});

	}

}
