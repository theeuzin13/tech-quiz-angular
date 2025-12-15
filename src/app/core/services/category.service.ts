import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { iconList } from '../../shared/utils/category-icons';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private api = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  createCategory(name: string, iconName: string): Observable<any> {
    return this.http.post(this.api, { name, icon: iconName });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<any[]>(this.api).pipe(
      map((items: any[]) =>
        items.map(item => ({
          uuid: item.uuid,
          name: item.name,
          icon: item.icon
        })),
      ),
    );
  }

  getCategory(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  updateCategory(id: string, name: string, icon: string): Observable<any> {

    return this.http.put(`${this.api}/${id}`, { name, icon });
  }


  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
