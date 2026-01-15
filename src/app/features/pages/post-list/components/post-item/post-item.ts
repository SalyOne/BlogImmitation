import {Component, Input} from '@angular/core';
import {
  MatCardModule
} from '@angular/material/card';
import {Post} from '../../../../../core/models/post.model';
import {TruncatePipe} from '../../../../../shared/pipes/truncate-pipe';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-post-item',
  imports: [
    MatCardModule,
    TruncatePipe,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './post-item.html',
  styleUrl: './post-item.scss',
})
export class PostItem {
  @Input({ required: true }) postItem!: Post;
}
