import { Injectable, signal } from '@angular/core';

export interface Question {
  id: number;
  text: string;
  categoryId: number;
}

@Injectable({ providedIn: 'root' })
export class QuestionService {

  // MOCK: perguntas
  private _questions = signal<Question[]>([
    { id: 1, text: 'What does HTML stand for?', categoryId: 1 },
    { id: 2, text: 'Which protocol is used for secure web browsing?', categoryId: 2 },
    { id: 3, text: 'What is the main function of a CPU?', categoryId: 3 },
    { id: 4, text: 'What type of learning uses labeled data?', categoryId: 4 },
    { id: 5, text: 'What does SQL stand for?', categoryId: 6 },
  ]);

  questions = this._questions; // exposto como signal()

  getQuestionsByCategory(categoryId: number) {
    return this._questions().filter(q => q.categoryId === categoryId);
  }
}
