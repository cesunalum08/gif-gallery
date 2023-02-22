import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchGiphyService {
  private _apiKey = environment.GIF_API_KEY;
  private _link = "http://api.giphy.com/v1/gifs/search?"

  constructor(private readonly _http: HttpClient) { }

  private _requestHandler(searchString: string, offset: number = 0) {
    return this._link + `api_key=${this._apiKey}` + `&q=${searchString}` + `&offset=${offset}` + `&limit=10`;

  }

  download(url: string): Observable<Blob> {
    return this._http.get(url, {
      responseType: 'blob'
    })
  }

  getGifsFromGIPHY(searchString: string, offset?: number): Observable<any> {
    return this._http.get(this._requestHandler(searchString, offset));
  }
}
