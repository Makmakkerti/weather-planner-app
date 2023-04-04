import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { City } from "./city.model";

@Injectable({ providedIn: "root" })
export class CitiesService {
  private cities: City[] = [];
  private citiesUpdated = new Subject<City[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getCities() {
    this.http
      .get<{ message: string; cities: any }>("http://localhost:3000/api/cities")
      .pipe(
        map((cityData) => {
          return cityData.cities.map((city) => {
            return {
              label: city.label,
              content: city.description,
              name: city.name,
            };
          });
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

  getCity(id: string) {
    return this.http.get<{ _id: string; label: string; description: string }>(
      "http://localhost:3000/api/cities/" + id
    );
  }
}
