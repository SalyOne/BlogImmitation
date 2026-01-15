import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreatePostDto, Post, UpdatePostDto} from '../models/post.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // Change from external API to in-memory API
  private apiUrl = `${environment.apiUrl}/posts`;
  http = inject(HttpClient);

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(postData: CreatePostDto): Observable<Post> {
    const newPost = {
      ...postData,
      createdAt: new Date().toISOString().split('T')[0] // '2026-01-15'
    };

    return this.http.post<Post>(this.apiUrl, newPost);
  }

  updatePost(id: number, post: UpdatePostDto): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
