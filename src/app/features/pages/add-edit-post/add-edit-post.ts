import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, EMPTY, map} from 'rxjs';
import {Post, UpdatePostDto} from '../../../core/models/post.model';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PostService} from '../../../core/services/post.service';
import {NotificationService} from '../../../core/services/notification.service';

@Component({
  selector: 'app-add-edit-post',
  imports: [MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-edit-post.html',
  styleUrl: './add-edit-post.scss',
})
export class AddEditPost  implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  snackBar = inject(NotificationService);
  fb = inject(FormBuilder);
  postService = inject(PostService);
  private destroyRef = inject(DestroyRef);

  postForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', [Validators.required,Validators.minLength(50)]],
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

    const payLoad:UpdatePostDto = {
      ...this.postInfo,                 // brings id + createdAt

      ...this.postForm.getRawValue()
    }

    console.log(payLoad)

    if (this.postInfo){
      this.postService.updatePost(+this.postInfo?.id, payLoad).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(res=>{
        this.snackBar.message("პოსტი წარმატებით განახლდა!","success")
        this.router.navigate(['/posts/'+ this.postInfo?.id]);
      })
    }else{

      this.postService.createPost(this.postForm.getRawValue()).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(res=>{
        this.snackBar.message("პოსტი წარმატებით დაემატა!","success")
        this.router.navigate(['/posts']);

      })
    }
  }
}
