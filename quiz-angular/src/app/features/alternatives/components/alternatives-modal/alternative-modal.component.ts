import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-alternative-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './alternative-modal.component.html',
  styleUrls: ['./alternative-modal.component.scss']
})
export class AlternativeModalComponent {

  @Input() visible = false;
  @Input() data: any = null;

  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();

  text = '';
  correct = false;
  questionText = '';

  ngOnChanges() {
    if (this.data) {
      this.text = this.data.text;
      this.correct = this.data.correct;
      this.questionText = this.data.questionText;
    } else {
      this.text = '';
      this.correct = false;
      this.questionText = '';
    }
  }

  submit() {
    this.save.emit({
      text: this.text,
      correct: this.correct,
      questionText: this.questionText
    });
  }
}
