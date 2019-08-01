import {Component, Input, OnInit} from '@angular/core';
import { FetchFeedService } from '../services/fetch-feed.service';
import { UpdateFeedTagService} from '../services/update-feed-tag.service';

@Component({
  selector: 'app-list-feed',
  templateUrl: './list-feed.component.html',
  styleUrls: ['./list-feed.component.sass']
})
/**
 * @description - Component to render list of images
 * @param {string} tag - to fetch images by tag from Flickr
 * @param {Array} feedList - to save the list of image URLs fetched from Flickr
 * @param {string} errorMsg - to store the error message when API call fails
 */
export class ListFeedComponent implements OnInit {

  @Input() tag: string;
  feedList = [];
  errorMsg: string;
  constructor(public fetchFeed: FetchFeedService, private updateFeed: UpdateFeedTagService) { }
  /**
   * @description - Method - To call API to fetch public feed and subscribe to changes in response
   * @returns - none
   */
  ngOnInit() {
    this.fetchFeed.getFlickrFeed(this.tag).subscribe((data) => {
      if (data) {
        data.forEach((element) => {
          if (element.media) {
            this.feedList.push(element.media.m);
          }
        });
      }
    }, error1 => {
      this.errorMsg = 'Unable to fetch feed';
    });
    this.updateFeed.feedUrlListSubject$.subscribe((data) => {
      if (data) {
        this.feedList = data;
      }
    }, error1 => {
      this.errorMsg = 'Unable to fetch feed';
    });
  }
}
