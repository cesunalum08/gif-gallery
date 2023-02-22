import { Component, ViewChild } from '@angular/core';
import { GIFDataService } from '../services/gifdata.service';
import { GifData } from '../models/gif-data';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SearchGIFComponent } from '../search-gif/search-gif.component';
import {
  CdkDrag,
  CdkDragStart,
  CdkDropList, CdkDropListGroup, CdkDragMove, CdkDragEnter,
  moveItemInArray
} from "@angular/cdk/drag-drop";


@Component({
  selector: 'app-gifgallery',
  templateUrl: './gifgallery.component.html',
  styleUrls: ['./gifgallery.component.less']
})
export class GIFGalleryComponent {
  @ViewChild(CdkDropListGroup) listGroup!: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) placeholder!: CdkDropList;

  public isLoading = false;
  public displayedGifs: GifData[] = [];
  public ascending = false;
  public selectedGif?: GifData;

  constructor(
    private readonly _gifDataService: GIFDataService,
    private _bottomSheet: MatBottomSheet) {
  }

  openBottomSheet(): void {
    this._bottomSheet.open(SearchGIFComponent);
  }

  ngOnInit() {
    this.loadAllStoredGifs();
  }

  loadAllStoredGifs() {
    this.isLoading = true;
    this._gifDataService.fetchImagesFromLocal();
    this.displayedGifs = this._gifDataService.gifStorage;
    this.isLoading = false;
  }

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

  downloadSelected() {
    if (this.selectedGif) {
      this._gifDataService.download(this.selectedGif);
    }
  }
}
