import { Component, OnInit } from '@angular/core';
import {WeatherItem} from '../weather-item';
import {WeatherService} from '../weather.service';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css'],
  providers: [WeatherService]
})
export class WeatherListComponent implements OnInit {
  weatherItems: WeatherItem[];
  constructor( public weatherService: WeatherService ) {
  }

  ngOnInit() {
    this.weatherItems = this.weatherService.getWeatherItems();
  }

}
