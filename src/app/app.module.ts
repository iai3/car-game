import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AreaComponent } from './area/area.component';
import { CellComponent } from './cell/cell.component';
import { StuntCar } from './stunt-car/stunt-car.component';


@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    CellComponent,
    StuntCar
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
