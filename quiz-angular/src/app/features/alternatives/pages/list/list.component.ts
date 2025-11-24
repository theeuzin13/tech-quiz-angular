import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlternativeModalComponent } from '../../components/alternatives-modal/alternative-modal.component';
import { Alternative, AlternativeService } from '../../../../core/services/alternative.service';
import { QuestionMock } from '../../../../core/mocks/question.mock';

@Component({
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule, AlternativeModalComponent]
})
export class ListComponent {

  alternatives = signal<Alternative[]>([]);

  questions = QuestionMock;

  modalVisible = signal(false);
  editingItem = signal<Alternative | null>(null);

  constructor(private service: AlternativeService) {
    this.alternatives = this.service.alternatives;
  }

  openCreate() {
    this.editingItem.set(null);
    this.modalVisible.set(true);
  }

  openEdit(item: Alternative) {
    this.editingItem.set(item);
    this.modalVisible.set(true);
  }

  save(data: any) {
    if (this.editingItem()) {
      this.service.update(this.editingItem()!.id, data);
    } else {
      this.service.create(data);
    }

    this.modalVisible.set(false);
  }

  delete(id: number) {
    this.service.delete(id);
  }

  getQuestionText(id: number): string {
  const q = this.questions.find(q => q.id === id);
  return q ? q.text : '';
}
}
