import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListFeedComponent } from './feed-list/list-feed.component';


const routes: Routes = [
  {path: 'listFeedImages', component: ListFeedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
