import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
	title = 'app';

	ngOnInit() {

		Plotly.newPlot('chart', [{ 'x': [1, 2, 3, 4, 5], 'y': [1, 2, 3, 4, 5] }]);

	}
}
