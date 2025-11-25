import { Injectable, signal } from '@angular/core';
import { AlternativeService } from './alternative.service';
import { QuestionService } from './question.service';

@Injectable({ providedIn: 'root' })
export class QuizService {

  questions = signal<any[]>([]);
  currentIndex = signal(0);
  score = signal(0);

  private _categoryId = 0;
  private _categoryName = '';

  constructor(
    private questionService: QuestionService,
    private alternativeService: AlternativeService
  ) {}

  /** Guarda categoria selecionada */
  start(categoryId: number) {
    this._categoryId = categoryId;

    const questions = this.questionService.questions()
      .filter(q => q.categoryId === categoryId);

    const withAlternatives = questions.map(q => ({
      ...q,
      alternatives: this.alternativeService.alternatives()
        .filter(a => a.questionId === q.id)
    }));

    this.questions.set(withAlternatives);
    this.currentIndex.set(0);
    this.score.set(0);
  }

  /** Getters */
  categoryId() {
    return this._categoryId;
  }

  categoryName() {
    return this._categoryName;
  }

  /** Total de certas */
  correct() {
    return this.score();
  }

  /** Total de erradas */
  wrong() {
    return this.questions().length - this.score();
  }

  /** Responder */
  answer(isCorrect: boolean) {
    if (isCorrect) this.score.update(s => s + 1);
    this.currentIndex.update(i => i + 1);
  }

  /** Resetar quiz */
  reset() {
    this.questions.set([]);
    this.currentIndex.set(0);
    this.score.set(0);
    this._categoryId = 0;
  }
}
