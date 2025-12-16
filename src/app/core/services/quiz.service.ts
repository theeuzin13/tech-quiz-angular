import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
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
    private alternativeService: AlternativesService,
    private router: Router
  ) {}

  start(categoryId: string) {
    this._categoryId = categoryId;

    this.questions.set([]);
    this.currentIndex.set(0);
    this.score.set(0);

    this.questionService.getQuestions().subscribe((questions: any[]) => {

      const filteredQuestions = questions.filter(
        (q: any) => q.categoryId === categoryId
      );

      if (filteredQuestions.length === 0) {
        this.router.navigate(['/quiz-empty']);
        return;
      }

      this._categoryName = filteredQuestions[0].categoryName;

      this.alternativeService.getAlternatives().subscribe(alternatives => {

        const withAlternatives = filteredQuestions.map((q: any) => ({
          ...q,
          alternatives: alternatives.filter(
            (a: any) => a.questionId === q.id
          )
        }));

        const validQuestions = withAlternatives.filter(
          q => q.alternatives.length > 0
        );

        if (validQuestions.length === 0) {
          this.router.navigate(['/quiz-empty']);
          return;
        }

        this.questions.set(validQuestions);
      });
    });
  }

  categoryId() {
    return this._categoryId;
  }

  categoryName() {
    return this._categoryName;
  }

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
  }
}
