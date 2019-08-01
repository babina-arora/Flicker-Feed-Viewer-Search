import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FetchFeedService } from '../services/fetch-feed.service';
import { UpdateFeedTagService } from '../services/update-feed-tag.service';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { TopMenuComponent } from './top-menu.component';
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

let component: TopMenuComponent;
let fixture: ComponentFixture<TopMenuComponent>;

describe('TopMenuComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [ TopMenuComponent ],
      providers: [
        { provide: FetchFeedService, useClass: MockFetchFeedService },
        UpdateFeedTagService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(TopMenuComponent);
    component = fixture.debugElement.componentInstance;
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a call to FetchFeedService.getFlickrFeed()', () => {
    spyOn(component.fetchFeedService, 'getFlickrFeed').and.callThrough();
    component.searchFeed('kitten');
    expect(component.fetchFeedService.getFlickrFeed).toHaveBeenCalled();
  });
});

describe('ListFeedComponent when service call fails', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMenuComponent ],
      imports: [HttpClientTestingModule],
      providers: [{ provide: FetchFeedService, useClass: MockFailFetchFeedService }, UpdateFeedTagService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TopMenuComponent);
        component = fixture.debugElement.componentInstance;
      });
  }));
  it('should log the error when unable to get records', async () => {
    spyOn(component.fetchFeedService, 'getFlickrFeed').and.callThrough();
    const errMsg = 'Unable to fetch feed';
    component.searchFeed('kitten');
    await fixture.whenStable();
    expect(component.errorMsg).toBe(errMsg);
  });
});
