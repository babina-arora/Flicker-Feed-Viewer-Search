import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { ListFeedComponent } from './list-feed.component';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import { FetchFeedService } from '../services/fetch-feed.service';
import { FeedImageComponent } from './components/feed-image/feed-image.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UpdateFeedTagService } from '../services/update-feed-tag.service';
import {Observable, of, throwError} from 'rxjs';

const expectedUrls = ['https:\/\/live.staticflickr.com\/65535\/48428813166_de6fb2de05_m.jpg',
  'https:\/\/live.staticflickr.com\/65535\/48428814716_59ec386b04_m.jpg'];

class MockFetchFeedService {
  public getFlickrFeed(tag: string): Observable<Array<string>> {
    return of(expectedUrls);
  }
}

class MockFailFetchFeedService {
  public getFlickrFeed(tag: string): Observable<Array<string>> {
    return throwError('Unable to fetch feed');
  }
}

let component: ListFeedComponent;
let fixture: ComponentFixture<ListFeedComponent>;

describe('ListFeedComponent when service call succeeds', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFeedComponent, FeedImageComponent ],
      imports: [HttpClientTestingModule],
      providers: [{ provide: FetchFeedService, useClass: MockFetchFeedService }, UpdateFeedTagService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ListFeedComponent);
        component = fixture.debugElement.componentInstance;
      });
  }));

  it('should make a call to FetchFeedService.getFlickrFeed()', () => {
    spyOn(component.fetchFeed, 'getFlickrFeed').and.callThrough();
    component.ngOnInit();
    expect(component.fetchFeed.getFlickrFeed).toHaveBeenCalled();
  });
});

describe('ListFeedComponent when service call fails', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFeedComponent, FeedImageComponent ],
      imports: [HttpClientTestingModule],
      providers: [{ provide: FetchFeedService, useClass: MockFailFetchFeedService }, UpdateFeedTagService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ListFeedComponent);
        component = fixture.debugElement.componentInstance;
      });
  }));
  it('should log the error when unable to get records', async () => {
    spyOn(component.fetchFeed, 'getFlickrFeed').and.callThrough();
    const errMsg = 'Unable to fetch feed';
    component.ngOnInit();
    await fixture.whenStable();
    expect(component.errorMsg).toBe(errMsg);
  });
});
