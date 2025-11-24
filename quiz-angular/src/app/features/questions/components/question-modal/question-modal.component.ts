import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-modal.component.html',
  styleUrl: './question-modal.component.scss'
})
export class QuestionModalComponent {

  @Input() visible = false;
  @Input() data: any = null;
  @Input() categories: string[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  text = '';
  category = '';

  ngOnChanges() {
    if (this.data) {
      this.text = this.data.text;
      this.category = this.data.category;
    } else {
      this.text = '';
      this.category = this.categories[0];
    }
  }

  submit() {
    this.save.emit({
      id: this.data?.id,
      text: this.text,
      category: this.category
    });
  }
}
