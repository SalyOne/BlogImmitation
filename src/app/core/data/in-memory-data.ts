import { Injectable } from '@angular/core';
import {POSTS_DATA} from './mock-data/post-data/posts.data';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryData implements InMemoryDbService {

  createDb() {
    const posts = POSTS_DATA;
    return {posts};
  }
}
