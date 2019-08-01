import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListFeedComponent } from './feed-list/list-feed.component';
import { FeedImageComponent } from './feed-list/components/feed-image/feed-image.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { FetchFeedService } from './services/fetch-feed.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { UpdateFeedTagService } from './services/update-feed-tag.service';

@NgModule({
  declarations: [
    AppComponent,
    ListFeedComponent,
    FeedImageComponent,
    TopMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [FetchFeedService, UpdateFeedTagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
