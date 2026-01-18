import { Injectable } from '@angular/core';
import {POSTS_DATA} from './mock-data/post-data/posts.data';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {ABOUT_DATA} from "./mock-data/about/about.data";

@Injectable({
  providedIn: 'root',
})
export class InMemoryData implements InMemoryDbService {

  createDb() {
    const posts = POSTS_DATA;
    const about = ABOUT_DATA;
    return {posts, about};
  }
}
