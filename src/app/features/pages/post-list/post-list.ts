import { Component } from '@angular/core';
import {of} from 'rxjs';
import {PostItem} from './components/post-item/post-item';

@Component({
  selector: 'app-post-list',
  imports: [
    PostItem
  ],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList {
  posts = [1,2,3,4];
  protected readonly of = of;
}
