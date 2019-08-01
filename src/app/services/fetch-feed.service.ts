import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { GET_FLICKR_FEED_API } from '../config/config';

/**
 * @description - Service to make call to Node Js API and get the list of images
 * @param  tag - to fetch images by tag from Flickr
 */

@Injectable()
export class FetchFeedService {

  constructor(private http: HttpClient) {}
  /**
   * @method getFlickrFeed
   * @description gets the response from Node js API to fetch the public feed
   * @returns listOfImages - Array of image objects from API
   */
  getFlickrFeed(tag: string) {
    tag = tag ? tag : 'none';
    let listOfImages = [];
    return this.http.get(GET_FLICKR_FEED_API + tag)
      .pipe(
        map((response: any) => {
          if (response.body.items) {
            listOfImages =  response.body.items;
          }
          return listOfImages;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status !== 200) {
            return throwError(error);
          }
        })
      );
  }
}

