
import {inject, TestBed} from '@angular/core/testing';
import { UpdateFeedTagService } from './update-feed-tag.service';

const feedUrls = ['https:\/\/live.staticflickr.com\/65535\/48428813166_de6fb2de05_m.jpg',
  'https:\/\/live.staticflickr.com\/65535\/48428814716_59ec386b04_m.jpg'];

describe('FetchFeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateFeedTagService]
    });
  });
  it(
    'should get call publish feed to update the latest feed',
    inject(
      [ UpdateFeedTagService],
      (updateFeedTagService: UpdateFeedTagService) => {
        updateFeedTagService.publishFeed(feedUrls);
      }
    )
  );
});
