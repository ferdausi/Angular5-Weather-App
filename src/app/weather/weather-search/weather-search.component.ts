import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { WeatherItem } from '../weather-item';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css'],
  providers: [WeatherService]
})
export class WeatherSearchComponent implements OnInit {
    data: any = {} ;
    private searchStream = new Subject<string>();
    constructor( private weatherService: WeatherService) { }

    ngOnInit() {
        this.searchStream
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap( (input: string) => this.weatherService.searchWeatherData(input))
            )
            .subscribe(
                data => this.data = data
            );
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
    onSearchLocation(cityName: string) {
        this.searchStream
            .next(cityName);
  }

}

