
import { TestBed} from '@angular/core/testing';
import { UpdateFeedTagService } from './update-feed-tag.service';
import {of} from 'rxjs';

const feedUrls = ['https:\/\/live.staticflickr.com\/65535\/48428813166_de6fb2de05_m.jpg',
  'https:\/\/live.staticflickr.com\/65535\/48428814716_59ec386b04_m.jpg'];

describe('FetchFeedService', () => {
  let updateFeedTagService: UpdateFeedTagService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateFeedTagService]
    });
    updateFeedTagService = TestBed.get(UpdateFeedTagService);
  });
  it('should call publish feed to update the latest feed', () => {
      spyOn(updateFeedTagService, 'publishFeed').and.callThrough();
      updateFeedTagService.publishFeed(feedUrls);
    }
  );
});
