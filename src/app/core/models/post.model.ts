export interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
  createdAt: string;
}

export interface CreatePostDto {
  title: string;
  author: string;
  description: string;
}

export interface UpdatePostDto {
  id?: number;
  title?: string;
  author?: string;
  description?: string;
  createdAt?: string;
}
