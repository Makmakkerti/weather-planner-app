import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CitiesListComponent } from "./cities/cities-list/city-list.component";

const routes: Routes = [{ path: "", component: CitiesListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
