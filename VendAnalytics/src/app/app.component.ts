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

		var url = 'http://172.26.135.37:3000/analytics/revenue_pie'
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

	ngOnInit() {

	}
}
