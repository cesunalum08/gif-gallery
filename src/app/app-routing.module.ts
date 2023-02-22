import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchGIFComponent } from './search-gif/search-gif.component';
import { GIFGalleryComponent } from './gifgallery/gifgallery.component';

const routes: Routes = [
  { path: "searchGif", component: SearchGIFComponent },
  { path: "gifGallery", component: GIFGalleryComponent },
  { path: "", component: GIFGalleryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
