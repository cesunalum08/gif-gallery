import { Component, HostListener } from '@angular/core';
import { GIFDataService } from '../services/gifdata.service';
import { GifData } from '../models/gif-data';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SearchGIFComponent } from '../search-gif/search-gif.component';
import {
  moveItemInArray,
  CdkDragDrop
} from "@angular/cdk/drag-drop";


@Component({
  selector: 'app-gifgallery',
  templateUrl: './gifgallery.component.html',
  styleUrls: ['./gifgallery.component.less']
})
export class GIFGalleryComponent {
  public isLoading = false;
  public displayedGifs: GifData[] = [];
  public ascending = true;
  public selectedGif?: GifData;
  private _toggleClick = false;
  public columnCount = 3;


  constructor(
    private readonly _gifDataService: GIFDataService,
    private _bottomSheet: MatBottomSheet) {
  }

  /**
   * Open component 2: Search GIF on GIPHY
   */
  openBottomSheet(): void {
    this._bottomSheet.open(SearchGIFComponent);
  }

  ngOnInit() {
    this.loadAllStoredGifs();
  }

  /**
   * Initialize all stored GIFs
   */
  loadAllStoredGifs() {
    this.isLoading = true;
    this._gifDataService.fetchImagesFromLocal();
    this.displayedGifs = this._gifDataService.gifStorage;
    this.isLoading = false;
  }

  /**
   * Ascending / Descending date sort
   */
  toggleDateFilter() {
    this.ascending = !this.ascending;
    this.displayedGifs.sort((a, b) => {
      if (this.ascending) {
        return a.dateAdded - b.dateAdded;
      } else {
        return b.dateAdded - a.dateAdded;
      }
    });
  }

  /**
   * search current GIF list by entered search string
   * @param searchString from input search on page
   * @returns void, updates only the displayed list of the page
   */
  searchListByString(searchString: string) {
    if (searchString === "") {
      this.displayedGifs = this._gifDataService.gifStorage;
      return;
    }
    searchString = searchString.toLowerCase();
    this.displayedGifs = this._gifDataService.gifStorage.filter((item: GifData) => item.name.toLowerCase().includes(searchString));
  }

  /**
   * download the selected GIF
   */
  downloadSelected() {
    if (this.selectedGif) {
      this._gifDataService.download(this.selectedGif);
    }
  }

  /**
   * undo click of selected GIF
   */
  @HostListener("click")
  clickedOut() {
    if (this.selectedGif) {
      if (this._toggleClick) {
        this.selectedGif = undefined;
        this._toggleClick = false;
      } else {
        this._toggleClick = true;

      }
    }
  }

  /**
   * Drag & drop event
   * @param event 
   */
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedGifs, event.previousIndex, event.currentIndex);
  }

}