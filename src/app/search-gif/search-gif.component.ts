import { Component, Inject } from '@angular/core';
import { GIFDataService } from '../services/gifdata.service';
import { GiphyResponseData } from '../models/giphy-response-data';
import { GifData } from '../models/gif-data';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-search-gif',
  templateUrl: './search-gif.component.html',
  styleUrls: ['./search-gif.component.less']
})
export class SearchGIFComponent {

  public isLoading = false;
  public searchedGifs: GiphyResponseData[] = [];
  public selectedGif: GiphyResponseData | undefined;
  private _lastSearchedString = "";

  constructor(
    private readonly _gifDataService: GIFDataService,
    private _bottomSheetRef: MatBottomSheetRef<SearchGIFComponent>,
    public dialog: MatDialog) { }

  /**
   * Search GIF using user input
   * @param searchString 
   * @param offset 
   */
  searchGif(searchString: string, offset: number = 0, limit?: number) {
    if (searchString != this._lastSearchedString) {
      this.searchedGifs = [];
    }

    if (searchString != "") {
      this.isLoading = true;
      this._gifDataService.fetchImagesFromAPI(searchString, offset, limit).subscribe(results => {
        this.searchedGifs = this.searchedGifs.concat(results);
        this.isLoading = false;
        this._lastSearchedString = searchString;
      });
    }
  }

  ngOnDestroy() {
    this.searchedGifs = [];
    this.selectedGif = undefined;
    this.isLoading = false;
  }

  /**
   * Open confirmation dialog upon selecting GIF
   * @param gif 
   */
  openDialog(gif: GiphyResponseData): void {
    this.selectedGif = gif;
    const dialogRef = this.dialog.open(AddGifDialog, {
      data: this.selectedGif,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.selectedGif!.name = result;
        this.addToStorage();
      }
    });
  }

  /**
   * Add GIF to local storage and displayed list
   */
  addToStorage() {
    if (this.selectedGif) {
      const localGifData = new GifData();
      localGifData.name = this.selectedGif.name;
      localGifData.url = this.selectedGif.url;
      localGifData.dateAdded = Date.now();
      this._gifDataService.pushGifToStore(localGifData);
    }
    this._gifDataService.updateLocalStorage();
    // this._location.back();
    this._bottomSheetRef.dismiss();
  }

  /**
   * 
   * @param searchString Load more GIFS
   */
  loadMore(searchString: string) {
    this.searchGif(searchString, this.searchedGifs.length);
  }

}

@Component({
  selector: 'add-gif-dialog',
  templateUrl: 'add-gif.dialog.html',
})
export class AddGifDialog {
  constructor(
    public dialogRef: MatDialogRef<AddGifDialog>,
    @Inject(MAT_DIALOG_DATA) public data: GifData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
