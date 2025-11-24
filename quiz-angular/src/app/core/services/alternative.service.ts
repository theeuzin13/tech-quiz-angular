import { Injectable, signal } from '@angular/core';

export interface Alternative {
  id: number;
  text: string;
  correct: boolean;
  questionId: number;
}

@Injectable({ providedIn: 'root' })
export class AlternativeService {

  alternatives = signal<Alternative[]>([
    { id: 1, text: 'HyperText Markup Language', correct: true, questionId: 1 },
    { id: 2, text: 'High Tech Modern Language', correct: false, questionId: 1 },
    { id: 3, text: 'Home Tool Markup Language', correct: false, questionId: 1 },
    { id: 4, text: 'Hyperlinks and Text Markup Language', correct: false, questionId: 1 },
    { id: 5, text: 'HTTP', correct: false, questionId: 2 },
  ]);

  create(data: Omit<Alternative, 'id'>) {
    const newId = this.alternatives().length + 1;
    this.alternatives.update(list => [...list, { id: newId, ...data }]);
  }

  update(id: number, data: Partial<Alternative>) {
    this.alternatives.update(list =>
      list.map(item => item.id === id ? { ...item, ...data } : item)
    );
  }

  delete(id: number) {
    this.alternatives.update(list => list.filter(i => i.id !== id));
  }
}
