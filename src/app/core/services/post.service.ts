import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // Change from external API to in-memory API
  private apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  updatePost(id: number, post: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
