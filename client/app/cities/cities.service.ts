import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class CitiesService {
  private cities: [] = [];
  private citiesUpdated = new Subject<[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getCities() {
    this.http
      .get<{ message: string; cities: any }>("http://localhost:3000/api/cities")
      .pipe(
        map((cityData) => {
          return cityData.cities;
        })
      )
      .subscribe((transformedCities) => {
        this.cities = transformedCities;
        this.citiesUpdated.next([...this.cities]);
      });
  }

  getCityUpdateListener() {
    return this.citiesUpdated.asObservable();
  }

  getWeather(city: string) {
    return this.http.get<any>("http://localhost:3000/api/weather?city=" + city);
  }
}
