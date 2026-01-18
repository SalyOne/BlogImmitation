import { Component, inject } from '@angular/core';
import { PostItem } from './components/post-item/post-item';
import { PostService } from '../../../core/services/post.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  BehaviorSubject,
  combineLatest,
  map,
  shareReplay,
  finalize,
  startWith,
  distinctUntilChanged,
  debounceTime,
} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-post-list',
  imports: [
    PostItem,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AsyncPipe
  ],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList {
  private postService = inject(PostService);

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  allPosts$ = this.postService.getAllPosts().pipe(
    finalize(() => this.loadingSubject.next(false)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  private titleFilterSubject = new BehaviorSubject<string>('');
  private sortOrderSubject = new BehaviorSubject<'asc' | 'desc'>('desc');
  private pageIndexSubject = new BehaviorSubject<number>(0);
  private pageSizeSubject  = new BehaviorSubject<number>(10);

  titleFilter$ = this.titleFilterSubject.asObservable().pipe(
    map(v => v.trim().toLowerCase()),
    debounceTime(300),
    distinctUntilChanged(),
    startWith('')
  );

  sortOrder$ = this.sortOrderSubject.asObservable();
  pageIndex$ = this.pageIndexSubject.asObservable();
  pageSize$  = this.pageSizeSubject.asObservable();

  // გაფულტრული და დასორტილი პოსტები
  filteredAndSortedPosts$ = combineLatest([
    this.allPosts$,
    this.titleFilter$,
    this.sortOrder$,
  ]).pipe(
    map(([posts, filter, sortOrder]) => {
      let result = posts;

      if (filter) {
        result = result.filter(post =>
          (post.title ?? '').toLowerCase().includes(filter)
        );
      }

      result = [...result].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });

      return result;
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

// აქტიური გვერდის მიხედვით განაწილებული, დასორტილი და გაფილტრული პოსტები
  pagedPosts$ = combineLatest([
    this.filteredAndSortedPosts$,
    this.pageIndex$,
    this.pageSize$,
  ]).pipe(
    map(([posts, pageIndex, pageSize]) => {
      const start = pageIndex * pageSize;
      return posts.slice(start, start + pageSize);
    })
  );

  filteredTotal$ = this.filteredAndSortedPosts$.pipe(
    map(posts => posts.length)
  );

  onTitleFilterChange(value: string): void {
    this.titleFilterSubject.next(value);
    this.pageIndexSubject.next(0);
  }

  onSortOrderChange(value: 'asc' | 'desc'): void {
    this.sortOrderSubject.next(value);
    this.pageIndexSubject.next(0);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndexSubject.next(event.pageIndex);
    this.pageSizeSubject.next(event.pageSize);
  }
}

