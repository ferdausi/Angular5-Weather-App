import { Injectable } from '@angular/core';
import { Weather_Items } from './weather-data';
import { Observable } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {WeatherItem} from './weather-item';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor( private http: HttpClient) { }
  getWeatherItems() {
    return Weather_Items;
  }
  searchWeatherData(cityName: string): Observable<any> {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName +
                '&APPID=89e5916b944d2e87efbe12997b135eb2');
  }
  addWeatherItem( weatherItem: WeatherItem) {
    Weather_Items.push(weatherItem);
  }
}
