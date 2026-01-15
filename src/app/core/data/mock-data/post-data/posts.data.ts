import {Post} from '../../../models/post.model';


export const POSTS_DATA: Post[] = [
  {
    id: 1,
    title: 'Getting Started with Angular 20',
    author: 'John Doe',
    description: 'Angular 20 introduces amazing new features including improved signals, better performance, and enhanced developer experience. This comprehensive guide will walk you through all the major updates and show you how to leverage them in your projects.',
    createdAt: '2026-01-10'
  },
  {
    id: 2,
    title: 'Understanding Lazy Loading in Angular',
    author: 'Jane Smith',
    description: 'Lazy loading is a design pattern that delays the loading of resources until they are actually needed. In Angular applications, this technique can significantly improve initial load time and overall performance by splitting your application into smaller chunks that are loaded on demand.',
    createdAt: '2026-01-12'
  },
  {
    id: 3,
    title: 'Service Architecture Best Practices',
    author: 'Bob Johnson',
    description: 'Building a scalable Angular application requires a well-designed service architecture that properly separates concerns. This article explores proven patterns for organizing services, managing state, and creating maintainable data layers in your Angular applications.',
    createdAt: '2026-01-14'
  },
  {
    id: 4,
    title: 'Angular Material Theming Guide',
    author: 'Alice Williams',
    description: 'Creating beautiful and accessible user interfaces is easier than ever with Angular Material. This guide covers everything you need to know about implementing custom themes, including light and dark modes, color palettes, typography, and density configurations.',
    createdAt: '2026-01-15'
  }
];

console.log('📄 posts.data.ts loaded, POSTS_DATA:', POSTS_DATA);
