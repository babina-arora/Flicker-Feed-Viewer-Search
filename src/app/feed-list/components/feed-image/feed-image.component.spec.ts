import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedImageComponent } from './feed-image.component';
import { NO_ERRORS_SCHEMA} from '@angular/core';

describe('FeedImageComponent', () => {
  let component: FeedImageComponent;
  let fixture: ComponentFixture<FeedImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedImageComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedImageComponent);
    component = fixture.componentInstance;
    component.imageUrl = 'https:\/\/live.staticflickr.com\/65535\/48428813166_de6fb2de05_m.jpg';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
