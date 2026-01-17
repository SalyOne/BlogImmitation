import {Routes} from '@angular/router';
import {PostList} from './post-list';
import {PostDetails} from '../post-details/post-details';
import {postDetailsResolver} from '../post-details/post-details-resolver';
import {AddEditPost} from '../add-edit-post/add-edit-post';

export const POST_ROUTES: Routes = [
  {
    path: '',
    component: PostList,
  },
  {
    path: 'add',
    component: AddEditPost,
  },
  {
    path: ':id',
    component: PostDetails,
    resolve: {post: postDetailsResolver}
  },
  {
    path: ':id/edit',
    component: AddEditPost,
    resolve: {post: postDetailsResolver}
  },
]
