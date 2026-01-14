import {Routes} from '@angular/router';
import {PostList} from './post-list';
import {PostDetails} from '../post-details/post-details';

export const POST_ROUTES: Routes = [
  {
    path: '',
    component: PostList,
  },
  {
    path: ':id',
    component: PostDetails,
  },
]
