import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { delay, map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class WeatherService {
  constructor(private http: HttpClient, private router: Router) {}

  getWeather(city: string): Observable<any> {
    return this.http
      .get<any>("http://localhost:3000/api/weather?city=" + city)
      .pipe(
        map((data) => ({
          ...data,
          image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        })),
        delay(500)
      );
  }
}
