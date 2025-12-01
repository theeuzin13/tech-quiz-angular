import { Injectable, signal } from '@angular/core';
import { AlternativesService } from './alternative.service';
import { QuestionService } from './question.service';

@Injectable({ providedIn: 'root' })
export class QuizService {

  questions = signal<any[]>([]);
  currentIndex = signal(0);
  score = signal(0);

  private _categoryId = '';
  private _categoryName = '';

  constructor(
    private questionService: QuestionService,
    private alternativeService: AlternativesService
  ) {}

  /** Iniciar quiz */
  start(categoryId: string) {
    this._categoryId = categoryId;

    // 1. PEGAR APENAS AS QUESTÕES DA CATEGORIA
    this.questionService.getQuestions().subscribe(questions => {

      // questions vem com uuid
      const filteredQuestions = questions.filter((q: any) => q.categoryId === categoryId);

      // 2. PEGAR ALTERNATIVAS
      this.alternativeService.getAlternatives().subscribe(alternatives => {

        const withAlternatives = filteredQuestions.map((q: any) => ({
          ...q,
          alternatives: alternatives.filter((a: any) => a.questionId === q.id)
        }));

        this.questions.set(withAlternatives);
        this.currentIndex.set(0);
        this.score.set(0);
      });
    });
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

  wrong() {
    return this.questions().length - this.score();
  }

  answer(isCorrect: boolean) {
    if (isCorrect) this.score.update(s => s + 1);
    this.currentIndex.update(i => i + 1);
  }

  reset() {
    this.questions.set([]);
    this.currentIndex.set(0);
    this.score.set(0);
    this._categoryId = '';
  }
}
