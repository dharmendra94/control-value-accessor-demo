import { NetflixSearchRequest } from './../models/netflix-search-req';
import { SearchResponse } from './../models/netflix-search-response';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NetflixSearchService {
  url: string = environment.url;

  constructor(private httpClient: HttpClient) {}

  search(netflixSearchRequestParams: NetflixSearchRequest) {
    return this.httpClient.get<SearchResponse>(
      `${this.url}/search?${this.generateQueryParams(
        netflixSearchRequestParams
      )}`,
      {
        headers: {
          'x-rapidapi-key': environment['x-rapidapi-key'],
          'x-rapidapi-host': environment['x-rapidapi-host'],
        },
      }
    );
  }

  generateQueryParams(requestObj: NetflixSearchRequest) {
    return Object.keys(requestObj)
      .map((key) => escape(key) + '=' + escape(requestObj[key]))
      .join('&');
  }
}
