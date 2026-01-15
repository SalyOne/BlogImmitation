import {RedirectCommand, ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {PostService} from '../../../core/services/post.service';
import {catchError, of, tap} from 'rxjs';
import {Post} from '../../../core/models/post.model';

export const postDetailsResolver: ResolveFn<Post | RedirectCommand> = (route) => {
  const postService = inject(PostService);
  const router = inject(Router);

  const id = Number(route.paramMap.get('id'));

  return postService.getPostById(id).pipe(
    tap(post => console.log('Resolved post:', post)),
    catchError(err => {
      console.error('Resolver error', err);
      return of(new RedirectCommand(router.parseUrl('/posts')));
    })
  );
};
