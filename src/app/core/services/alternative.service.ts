import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment.prod";

interface Alternative {
  id: number;
  text: string;
  isCorrect: boolean;
  questionId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlternativesService {
  private api = `${environment.apiUrl}/alternatives`;

  constructor(private http: HttpClient) {}

  createAlternative(data: Omit<Alternative, 'id'>): Observable<any> {
    return this.http.post(`${this.api}`, data);
  }

  getAlternatives(): Observable<any> {
    return this.http.get(`${this.api}`);
  }

  getAlternative(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  updateAlternative(id: string, data: Partial<Alternative>): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data);
  }

  deleteAlternative(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
