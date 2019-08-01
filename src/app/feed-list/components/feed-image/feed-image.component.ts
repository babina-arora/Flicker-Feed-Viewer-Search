import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-feed-image',
  templateUrl: './feed-image.component.html',
  styleUrls: ['./feed-image.component.sass']
})
/**
 * @description - Component to render each image card
 */
export class FeedImageComponent implements OnInit {
  @Input() imageUrl: string;
  constructor() { }

  ngOnInit() {}
}
