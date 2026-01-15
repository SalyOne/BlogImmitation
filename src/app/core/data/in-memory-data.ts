import { Injectable } from '@angular/core';
import {POSTS_DATA} from './mock-data/post-data/posts.data';
import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api';
import {Post} from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryData implements InMemoryDbService {

  createDb() {
    const posts = POSTS_DATA;

    return {posts};
  }
  post(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;

    if (collectionName === 'posts') {
      const newPost = reqInfo.utils.getJsonBody(reqInfo.req);

      // Auto-add createdAt if not provided
      if (!newPost.createdAt) {
        newPost.createdAt = new Date().toISOString().split('T')[0];
      }

      // Auto-generate ID
      newPost.id = this.genId(reqInfo.collection as Post[]);

      reqInfo.collection.push(newPost);

      return reqInfo.utils.createResponse$(() => {
        return {
          body: newPost,
          status: 201
        };
      });
    }

    return undefined; // Let default POST handle it
  }

  genId<T extends { id: number }>(collection: T[]): number {
    return collection.length > 0
      ? Math.max(...collection.map(item => item.id)) + 1
      : 1;
  }
}
