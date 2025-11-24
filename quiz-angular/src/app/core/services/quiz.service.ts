import { Injectable, signal } from '@angular/core';
import { AlternativeService } from './alternative.service';
import { QuestionService } from './question.service';

@Injectable({ providedIn: 'root' })
export class QuizService {

  questions = signal<any[]>([]);
  currentIndex = signal(0);
  score = signal(0);

  constructor(
    private questionService: QuestionService,
    private alternativeService: AlternativeService
  ) {}

  start(categoryId: number) {
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

  answer(isCorrect: boolean) {
    if (isCorrect) this.score.update(s => s + 1);
    this.currentIndex.update(i => i + 1);
  }
}
