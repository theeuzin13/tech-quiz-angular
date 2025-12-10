import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private api = 'http://localhost:3000/questions';

  constructor(private http: HttpClient) {}

  createQuestion(description: string, categoryId: string): Observable<any> {
    return this.http.post(this.api, { description, categoryId });
  }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.api).pipe(
      map(items =>
        items.map(q => ({
          id: q.uuid,
          description: q.description,
          categoryId: q.categoryId,
          categoryName: q.categoryName
        }))
      )
    );
  }

  getQuestion(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  updateQuestion(id: string, description: string, categoryId: string): Observable<any> {
    return this.http.patch(`${this.api}/${id}`, { description, categoryId });
  }

  deleteQuestion(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
