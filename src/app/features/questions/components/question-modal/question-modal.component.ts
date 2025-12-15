import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss']
})
export class QuestionModalComponent implements OnChanges {

  @Input() visible = false;
  @Input() data: any = null;
  @Input() categories: any[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  description = '';
  categoryId = '';

  ngOnChanges() {
    if (this.data) {
      this.description = this.data.description;
      this.categoryId = this.data.categoryId;
    } else {
      this.description = '';
      this.categoryId = this.categories.length > 0 ? this.categories[0].id : '';
    }
  }

  submit() {
    this.save.emit({
      id: this.data?.id,
      description: this.description,
      categoryId: this.categoryId
    });
  }
}
