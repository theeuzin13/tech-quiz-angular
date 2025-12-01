import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private api = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  createCategory(name: string): Observable<any> {
    return this.http.post(`${this.api}`, { name });
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<any[]>(this.api).pipe(
      map((items: any[]) =>
        items.map(item => ({
          id: item.uuid,
          name: item.name,
        })),
      ),
    );
  }

  getCategory(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  updateCategory(id: string, name: string): Observable<any> {
    return this.http.put(`${this.api}/${id}`, { name });
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
