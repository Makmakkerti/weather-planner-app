import { Component, OnDestroy, OnInit } from "@angular/core";
import { WeatherService } from "./weather.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map, filter, concatMap, tap } from "rxjs/operators";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"],
})
export class WeatherComponent implements OnInit, OnDestroy {
  data$: Observable<any>;
  today: Date = new Date();
  loading = true;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.data$ = this.route.params.pipe(
      map((params) => params.locationName),
      filter((name) => !!name),
      tap(() => {
        this.loading = true;
      }),
      concatMap((name) => this.weatherService.getWeather(name)),
      tap(() => {
        this.loading = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.data$ = null;
  }
}
