import {Component, computed, inject, signal} from '@angular/core';
import {PostItem} from './components/post-item/post-item';
import {PostService} from '../../../core/services/post.service';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {finalize, shareReplay, tap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
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
  postService = inject(PostService);

  allPosts$ = this.postService.getAllPosts().pipe(
    shareReplay(1),
    finalize(() => this.loading.set(false))
  );
  allPosts = toSignal(this.allPosts$, { initialValue: [] });
  titleFilter = signal('');
  sortOrder = signal<'asc' | 'desc'>('desc');

  loading = signal(true);

  pageIndex = signal(0);
  pageSize = signal(10);
  // პოსტების არსებული (გაპილტრული და სორტირებული) სია. დამოკიდებულია ფილტრის ველში ჩაწერილ სიტყვაზე და სორტირების სელექტის არჩევანზე.  პაგინაციაც შესაბამისად ააფდეითდება განახლებული პოსტების რაოდენობის მიხედვით.
  pagedPosts = computed(() => {
    const posts = this.filteredAndSortedPosts();
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return posts.slice(start, end);
  });

  // ფილტრირებული და
  filteredAndSortedPosts = computed(() => {
      let posts = this.allPosts();

    // Apply title filter
    const filter = this.titleFilter().toLowerCase().trim();
    if (filter) {
      posts = posts.filter(post =>
        (post.title ?? '').toLowerCase().includes(filter)
      );
    }

    // Apply sorting
    posts = [...posts].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return this.sortOrder() === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return posts;
  });

  // გაფილტვრის შემდეგ არსებული პოსტების რაოდენობა
  filteredTotal = computed(() => this.filteredAndSortedPosts().length);

  //  ფილტრის ველში მნიშვნელობის შევსების შემდეგ შესაბამისი სიგნალის დათრიგერდება
  onTitleFilterChange(value: string): void {
    this.titleFilter.set(value);
    this.pageIndex.set(0);
  }
  //  დასორტირების სელექთის არჩევის შემდეგ შესაბამისი სიგნალის დათრიგერდება
  onSortOrderChange(value: 'asc' | 'desc'): void {
    this.sortOrder.set(value);
    this.pageIndex.set(0);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}


