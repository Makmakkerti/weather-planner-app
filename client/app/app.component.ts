import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { CitiesService } from "./cities/cities.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  cities: [] = [];
  cityControl: FormControl;
  isLoading = true;
  isCitySelected = false;
  private citiesSub: Subscription;
  constructor(
    private citiesService: CitiesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.router.navigate([""]);
    this.cityControl = new FormControl("");
    this.cityControl.valueChanges.subscribe((city) => {
      this.router.navigate([city]);
      this.isCitySelected = true;
    });
    this.citiesService.getCities();
    this.citiesSub = this.citiesService
      .getCityUpdateListener()
      .subscribe((cities: []) => {
        this.isLoading = false;
        this.cities = cities;
      });
  }
  ngOnDestroy() {
    this.citiesSub.unsubscribe();
  }
}
