import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {WeatherService} from '../weather.service';
import {WeatherItem} from '../weather-item';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css'],
  providers: [WeatherService]
})
export class WeatherSearchComponent implements OnInit {
  constructor( private weatherService: WeatherService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.weatherService.searchWeatherData(form.value.city)
        .subscribe(
            data => {
              const weatherItem = new WeatherItem(data.name, data.weather[0].description, data.main.temp);
              this.weatherService.addWeatherItem(weatherItem);
            }
        );
  }

}

