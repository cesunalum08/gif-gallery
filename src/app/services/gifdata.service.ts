import { Injectable } from '@angular/core';
import { SearchGiphyService } from './search-giphy.service';
import { Observable, map } from 'rxjs';
import { GiphyResponseData } from '../models/giphy-response-data';
import { GifData } from '../models/gif-data';

@Injectable({
  providedIn: 'root'
})
export class GIFDataService {

  private readonly _storageKey = "gifDataArray";

  public gifStorage: GifData[] = [];

  constructor(private readonly _searchGiphy: SearchGiphyService) { }

  fetchImagesFromLocal() {
    const itemData = localStorage.getItem(this._storageKey);
    if (itemData) {
      this.gifStorage = JSON.parse(itemData);
    }
  }

  fetchImagesFromAPI(searchString: string, offset: number = 0, limit?: number): Observable<GiphyResponseData[]> {
    return this._searchGiphy.getGifsFromGIPHY(searchString, offset, limit).pipe(
      map(data => {
        const result: GiphyResponseData[] = [];
        const images = data.data;
        if (images) {
          images.forEach((image: any) => {
            // find url in local storage
            const imageUrl = image.images.original.url;
            const dataIndex = this.gifStorage.findIndex((data) => data.url === imageUrl);

            // if not in current storage
            // add to search results
            if (dataIndex < 0) {
              const giphyImage = new GiphyResponseData();
              giphyImage.name = image.title;
              giphyImage.url = imageUrl;
              result.push(giphyImage);
            }
          });
        }
        return result;
      })
    )
  }

  pushGifToStore(gifData: GifData) {
    this.gifStorage.push(gifData);
  }

  removGifFromStore(gifData: GifData) {
    const index = this.gifStorage.findIndex((data) => data.url === gifData.url);
    if (index > -1) {
      this.gifStorage.splice(index, 1);
    }
  }

  updateLocalStorage() {
    localStorage.setItem(this._storageKey, JSON.stringify(this.gifStorage));
  }

  download(gifData: GifData): void {
    this._searchGiphy
      .download(gifData.url)
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = `${gifData.name}.gif`;
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }
}
