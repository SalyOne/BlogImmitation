import {Component, inject, OnInit} from '@angular/core';
import {PostService} from '../../../core/services/post.service';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../../core/models/post.model';
import {map} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-post-details',
  imports: [
    AsyncPipe,
    MatButton,
    MatIconModule
  ],
  templateUrl: './post-details.html',
  styleUrl: './post-details.scss',
})
export class PostDetails implements OnInit {
  postService = inject(PostService);
  route = inject(ActivatedRoute);

  post$ = this.route.data.pipe(
    map(d => d['post'] as Post)
  );
  ngOnInit() {

  }

  editPost() {

  }

  deletePost() {

  }
}
