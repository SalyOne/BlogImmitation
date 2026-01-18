import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs';
import {Post, UpdatePostDto} from '../../../core/models/post.model';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PostService} from '../../../core/services/post.service';
import {NotificationService} from '../../../core/services/notification.service';
import {CanComponentDeactivate} from '../../../core/guards/form-control-guard';

@Component({
  selector: 'app-add-edit-post',
  imports: [MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-edit-post.html',
  styleUrl: './add-edit-post.scss',
})
export class AddEditPost implements OnInit, CanComponentDeactivate {
  route = inject(ActivatedRoute);
  router = inject(Router);
  snackBar = inject(NotificationService);
  fb = inject(FormBuilder);

  postService = inject(PostService);
  private destroyRef = inject(DestroyRef);

  postForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(50)]],
    author: ['', Validators.required],
  });

  postInfo?: Post;

  ngOnInit() {
    this.route.data
      .pipe(
        map(d => d['post'] as Post | undefined),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(post => {
        this.postInfo = post;

        if (post) {
          this.postForm.patchValue({
            title: post.title,
            description: post.description,
            author: post.author,
          });
        }
      });
  }


  onSubmit() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsDirty()
      this.postForm.markAllAsTouched()
      return;
    }

    const payLoad: UpdatePostDto = {
      ...this.postInfo,
      ...this.postForm.getRawValue()
    }

    if (this.postInfo) {
      this.postService.updatePost(+this.postInfo?.id, payLoad).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(res => {
        this.snackBar.message("პოსტი წარმატებით განახლდა!", "success");

        this.finishAndGo(`/posts/${this.postInfo!.id}`)

      })
    } else {

      this.postService.createPost(this.postForm.getRawValue()).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(res => {
        this.snackBar.message("პოსტი წარმატებით დაემატა!", "success")
        this.finishAndGo('/posts')

      })
    }
  }
  canDeactivate(): boolean {
    return !this.postForm || this.postForm.pristine;
  }

  finishAndGo(url: string) {
    this.postForm.markAsPristine();
    this.postForm.markAsUntouched();
    this.router.navigateByUrl(url);
  }
}
