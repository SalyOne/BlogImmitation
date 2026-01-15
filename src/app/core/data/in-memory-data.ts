import { Injectable } from '@angular/core';
import {POSTS_DATA} from './mock-data/post-data/posts.data';
import {InMemoryDbService} from 'angular-in-memory-web-api';




// Add these logs OUTSIDE the class to test if import works
console.log('🔍 in-memory-data.ts file loaded');
console.log('🔍 POSTS_DATA imported:', POSTS_DATA);
console.log('🔍 POSTS_DATA is array?', Array.isArray(POSTS_DATA));
console.log('🔍 POSTS_DATA length:', POSTS_DATA?.length);

@Injectable({
  providedIn: 'root',
})
export class InMemoryData implements InMemoryDbService {

  constructor() {
    console.log('🏗️ InMemoryData service constructed');
  }
  createDb() {
    const posts = POSTS_DATA;

    console.log('==========================================');
    console.log('📦 IN-MEMORY DATABASE CREATED');
    console.log('📦 Posts count:', posts.length);
    console.log('📦 Posts data:', posts);
    console.log('==========================================');
    return {posts};
  }


  genId<T extends { id: number }>(collection: T[]): number {
    return collection.length > 0
      ? Math.max(...collection.map(item => item.id)) + 1
      : 1;
  }
}
