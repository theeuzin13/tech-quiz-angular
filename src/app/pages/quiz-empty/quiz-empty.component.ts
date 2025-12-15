import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-empty.component.html',
  styleUrls: ['./quiz-empty.component.scss']
})
export class QuizEmptyComponent {

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/home']);
  }
}
