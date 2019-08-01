import { FetchFeedService } from './fetch-feed.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import { GET_FLICKR_FEED_API } from '../config/config';

const expectedItems = {
    items: [
      {
        title: 'The red Hut',
        link: 'https:\/\/www.flickr.com\/photos\/wistiti\/48428813166\/',
        media: {m: 'https:\/\/live.staticflickr.com\/65535\/48428813166_de6fb2de05_m.jpg'},
        date_taken: '2018-08-30T13:26:40-08:00',
        description: '<p><a href=\"https:\/\/www.flickr.com\/people\/wistiti\/\">mousstique<\/a> posted a photo:<\/p> <p>' +
          '<a href=\"https:\/\/www.flickr.com\/photos\/wistiti\/48428813166\/\" ' +
          'title=\"The red Hut\"><img src=\"https:\/\/live.staticflickr.com\/65535\/48428813166_de6fb2de05_m.jpg\" ' +
          'width=\"240\" height=\"160\" alt=\"The red Hut\" \/><\/a><\/p>',
        published: '2019-08-01T07:14:40Z',
        author: 'nobody@flickr.com (\'mousstique\')',
        author_id: '54782652@N00',
        tags: 'norway lofoten hut beach ramberg longexposure red'
      },
      {
        title: '2019-08-01_09-14-51',
        link: 'https:\/\/www.flickr.com\/photos\/124742117@N03\/48428814716\/',
        media: {m: 'https:\/\/live.staticflickr.com\/65535\/48428814716_59ec386b04_m.jpg'},
        date_taken: '2019-07-30T18:23:18-08:00',
        description: ' <p><a href=\'https:\/\/www.flickr.com\/people\/124742117@N03\/\'>jeerpics<\/a> ' +
          'posted a photo:<\/p> <p><a href=\'https:\/\/www.flickr.com\/photos\/124742117@N03\/48428814716\/\' ' +
          'title=\'2019-08-01_09-14-51\'><img src=\'https:\/\/live.staticflickr.com\/65535\/48428814716_59ec386b04_m.jpg\' ' +
          'width=\'240\' height=\'191\' alt=\'2019-08-01_09-14-51\' \/><\/a><\/p> ',
        published: '2019-08-01T07:15:00Z',
        author: 'nobody@flickr.com (\'jeerpics\')',
        author_id: '124742117@N03',
        tags: ''
      }]
};
describe('FetchFeedService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [FetchFeedService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  it(
    'should get make http call to node API and get URls',
    inject(
      [HttpTestingController, FetchFeedService],
      (httpMock: HttpTestingController, fetchFeedService: FetchFeedService) => {
        fetchFeedService.getFlickrFeed('kitten').subscribe((obj: any) => {
          expect(obj.items.length).toBe(2);
          expect(obj.body).toEqual(expectedItems);
        });

        const mockReq = httpMock.expectOne(GET_FLICKR_FEED_API + 'kitten');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(expectedItems);

        httpMock.verify();
      }
    )
  );
});
