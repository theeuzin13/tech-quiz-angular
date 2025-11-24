import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../core/services/quiz.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  constructor(
    private route: ActivatedRoute,
    public quiz: QuizService,
    private router: Router
  ) {
    const id = Number(this.route.snapshot.paramMap.get('categoryId'));
    this.quiz.start(id);
  }

  chooseAlternative(correct: boolean) {
    this.quiz.answer(correct);

    if (this.quiz.currentIndex() >= this.quiz.questions().length) {
      this.router.navigate(['/quiz', this.route.snapshot.paramMap.get('categoryId'), 'result']);
    }
  }
}
