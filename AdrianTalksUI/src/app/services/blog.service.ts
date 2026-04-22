import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Blog } from '../models/blog';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  apiUrl = `${environment.api}/blog`;
  reqHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private http: HttpClient) { }

  getBlogs(take: number, categoryId: number = 0): Observable<Blog[]> {
    return this.http
      .get<Blog[]>(
        `${this.apiUrl}/getblogs?take=${take}&category=${categoryId}`
      )
      .pipe(
        map((blog) => {
          blog.forEach((bl) => {
            bl.slug = bl.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')
              .replace(/<[^>]*>/g, '');

            if (bl.category) {
              bl.category.slug = bl.category.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .replace(/<[^>]*>/g, '');
            }
          });

          return blog;
        })
      );
  }

  getBlog(blogId: number) {
    return this.http.get<Blog>(`${this.apiUrl}/getblog?blogid=${blogId}`).pipe(shareReplay(1), map((blog) => {
      blog.slug = blog.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/<[^>]*>/g, '');

      if (blog.category) {
        blog.category.slug = blog.category.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .replace(/<[^>]*>/g, '');
      }

      return blog;
    }));
  }

  getPopularBlogs(take: number, categoryId: number = 0): Observable<Blog[]> {
    return this.http
      .get<Blog[]>(
        `${this.apiUrl}/getpopularblogs?take=${take}&category=${categoryId}`
      )
      .pipe(
        map((blog) => {
          blog.forEach((bl) => {
            bl.slug = bl.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')
              .replace(/<[^>]*>/g, '');

            if (bl.category) {
              bl.category.slug = bl.category.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .replace(/<[^>]*>/g, '');
            }
          });

          return blog;
        })
      );
  }

  getRandomBlogs(take: number, categoryId: number = 0, excludeBlogId: number = 0): Observable<Blog[]> {
    return this.http
      .get<Blog[]>(
        `${this.apiUrl}/getrandomblogs?take=${take}&category=${categoryId}&excludeblogid=${excludeBlogId}`
      )
      .pipe(
        map((blog) => {
          blog.forEach((bl) => {
            bl.slug = bl.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')
              .replace(/<[^>]*>/g, '');

            if (bl.category) {
              bl.category.slug = bl.category.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .replace(/<[^>]*>/g, '');
            }
          });

          return blog;
        })
      );
  }
}
