import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MatCardModule
} from '@angular/material/card';

@Component({
  selector: 'app-post-item',
  imports: [
    MatButton,
    MatCardModule
  ],
  templateUrl: './post-item.html',
  styleUrl: './post-item.scss',
})
export class PostItem {

}
