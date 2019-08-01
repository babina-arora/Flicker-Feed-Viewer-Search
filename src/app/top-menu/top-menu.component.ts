import {Component} from '@angular/core';
import { FetchFeedService } from '../services/fetch-feed.service';
import { UpdateFeedTagService } from '../services/update-feed-tag.service';

/**
 * @description - Component to render list of images
 * @param  searchTag - to fetch images by tag from Flickr
 * @param  feedList - to save the list of image URLs fetched from Flickr
 * @param  errorMsg - to store the error message when API call fails
 */

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.sass']
})
export class TopMenuComponent {
  constructor(public fetchFeedService: FetchFeedService, private updateFeed: UpdateFeedTagService) { }
  searchTag: string;
  errorMsg: string;
  feedList = [];
  /**
   * @description - Method - To call API to fetch public feed
   * @returns - none
   */
  searchFeed(tag: string) {
    this.fetchFeedService.getFlickrFeed(tag).subscribe((data) => {
      if (data) {
        data.forEach((element) => {
          if (element.media) {
            this.feedList.push(element.media.m);
          }
        });
      }
      this.updateFeed.publishFeed(this.feedList);
    }, error1 => {
      this.errorMsg = 'Unable to fetch feed';
    });
  }
}
