import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
	title = 'app';

	constructor(private http: HttpClient) {} 

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

			var data = [{ values: values, labels: labels, type: 'pie', hole:0.4 }];
			var layout = { height: 600, width: 800, paper_bgcolor:'white', margin: { pad: 100 } };

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

			console.log(rows);
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
			
			var layout = { height: 600, width: 800, paper_bgcolor:'white', margin: { pad: 0 } };
			Plotly.newPlot('stock_table', data, layout);

		});
	}

	revenuePie() {

		var url = 'http://localhost:3000/analytics/revenue_pie';
		this.http.get(url).subscribe(rows => {
			console.log(rows);

			var values = []
			var labels = []
			var count = 0;
			for (var row in rows) {
				values.push(rows[row]['sum']);
				labels.push(rows[row]['item_name']);
				count += 1;
			}

			var data = [{ values: values, labels: labels, type: 'pie', hole:0.4 }];
			var layout = { height: 600, width: 800, paper_bgcolor:'white', margin: { pad: 100 } };

			Plotly.newPlot('pie_chart', data, layout);

		});
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
			
			var layout = { height: 600, width: 800, paper_bgcolor:'white', margin: { pad: 0 } };
			Plotly.newPlot('stock_table', data, layout);

		});

	}

	ngOnInit() {
		this.revenuePie();
		this.stockTable();
	}
}
