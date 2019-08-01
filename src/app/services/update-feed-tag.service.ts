import { Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

/**
 * @description - Service to publish changes in feed response
 */
@Injectable()
export class UpdateFeedTagService {

  constructor() {}
  private feedUrlListSubject = new BehaviorSubject<Array<string>>([]);
  public feedUrlListSubject$: Observable<Array<string>> = this.feedUrlListSubject.asObservable();
  /**
   * @method publishFeed
   * @description To share updated response from API across components
   * @params {Array} feedUrls updated response from API
   */
  publishFeed(feedUrls: Array<string>) {
    this.feedUrlListSubject.next(feedUrls);
  }
}

