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

	revenuePie() {

		var url = 'http://localhost:3000/analytics/revenue_pie';
		this.http.get(url).subscribe(rows => {
			console.log(rows);

			var values = []
			var labels = []
			for (var row in rows) {
				values.push(rows[row]['sum']);
				labels.push(rows[row]['item_name']);
			}

			var data = [{ values: values, labels: labels, type: 'pie' }];
			var layout = { height: 800, width: 1000 };

			Plotly.newPlot('chart', data, layout);

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
					fill: {color: "grey"},
					font: {family: "Arial", size: 12, color: "white"}
				},
				cells: {
					values: rows_data,
					align: "center",
					line: {color: "black", width: 1},
					font: {family: "Arial", size: 11, color: ["black"]}
				}
			}]

			Plotly.newPlot('chart', data);

		});

	}

	ngOnInit() {

	}
}
