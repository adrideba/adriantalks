import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = `${environment.api}/category`;
  reqHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private http: HttpClient) { }

  getCategory(): Observable<Category[]> {
    return this.http
      .get<Category[]>(
        `${this.apiUrl}/getcategory`
      )
      .pipe(
        map((category) => {
          category.forEach((cat) => {
            if (cat) {
              cat.slug = cat.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .replace(/<[^>]*>/g, '');
            }
          });

          return category;
        })
      );
  }
}
