import {Component, inject} from '@angular/core';
import {AboutService} from '../../../core/services/about.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [
    AsyncPipe
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  about$ = inject(AboutService).getAbout();

}
