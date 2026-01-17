import {Component, inject} from '@angular/core';
import {PostService} from '../../../core/services/post.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Post} from '../../../core/models/post.model';
import {filter, map, switchMap, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NotificationService} from '../../../core/services/notification.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ConfirmDialog} from '../../../shared/components/confirm-dialog/confirm-dialog';


@Component({
  selector: 'app-post-details',
  imports: [
    AsyncPipe,
    MatButton,
    MatIconModule,
    MatDialogModule,
    RouterLink
  ],
  templateUrl: './post-details.html',
  styleUrl: './post-details.scss',
})
export class PostDetails {
  postService = inject(PostService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  snackBar = inject(NotificationService);
  dialog = inject(MatDialog)

  postId!: number;
  post$ = this.route.data.pipe(
    map(d => d['post'] as Post),
    tap(data => this.postId = data.id)
  );

  deletePost() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'პოსტის წაშლა',
        message: 'ნამდვილად გსურთ პოსტის წაშლა?',
      }
    })

    dialogRef.afterClosed().pipe(
      filter(Boolean),
      switchMap(() => this.postService.deletePost(this.postId))
    ).subscribe(res => {
      this.snackBar.message("პოსტი წაიშალა წარმატებით", 'success');
      this.router.navigate(['/posts']);
    })
  }

}
