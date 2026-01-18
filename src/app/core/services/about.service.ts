import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AboutInfo} from '../models/about.model';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private apiUrl = `${environment.apiUrl}/about`;
  http = inject(HttpClient);

  getAbout(): Observable<AboutInfo> {
    return this.http.get<AboutInfo>(`${this.apiUrl}/1`);
  }
}
