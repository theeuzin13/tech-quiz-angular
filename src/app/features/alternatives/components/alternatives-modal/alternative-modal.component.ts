import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-alternative-modal',
  templateUrl: './alternative-modal.component.html',
  styleUrls: ['./alternative-modal.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class AlternativeModalComponent {

  @Input() visible = false;
  @Input() data: any = null;
  @Input() questions: any[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  form = {
    text: '',
    isCorrect: false,
    questionId: ''
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.form = {
        text: this.data.text,
        isCorrect: this.data.isCorrect,
        questionId: this.data.questionId
      };
    }

    if (changes['visible'] && !this.visible) {
      this.form = { text: '', isCorrect: false, questionId: '' };
    }
  }

  submit() {
    this.save.emit(this.form);
  }

  onClose() {
    this.close.emit();
  }
}
