import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { City } from "../city.model";
import { CitiesService } from "../cities.service";

@Component({
  selector: "app-cities-list",
  templateUrl: "./city-list.component.html",
  styleUrls: ["./city-list.component.css"],
})
export class CitiesListComponent implements OnInit, OnDestroy {
  cities: City[] = [];
  isLoading = false;
  private citiesSub: Subscription;

  constructor(public citiesService: CitiesService) {}

  ngOnInit() {
    this.isLoading = true;
    this.citiesService.getCities();
    this.citiesSub = this.citiesService
      .getCityUpdateListener()
      .subscribe((cities: City[]) => {
        this.isLoading = false;
        this.cities = cities;
      });
  }

  ngOnDestroy() {
    this.citiesSub.unsubscribe();
  }
}
