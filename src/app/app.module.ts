import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GIFGalleryComponent } from './gifgallery/gifgallery.component';
import { SearchGIFComponent, AddGifDialog } from './search-gif/search-gif.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from './material.module';
import { GridColsDirective } from './gridCols/grid-cols.directive';

@NgModule({
  declarations: [
    AppComponent,
    GIFGalleryComponent,
    SearchGIFComponent,
    GridColsDirective,
    AddGifDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
