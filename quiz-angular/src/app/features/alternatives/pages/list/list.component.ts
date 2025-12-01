import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AlternativesService } from '../../../../core/services/alternative.service';
import { QuestionService } from '../../../../core/services/question.service';
import { AlternativeModalComponent } from '../../components/alternatives-modal/alternative-modal.component';
import { Alternative } from '../../../../core/models/alternative.model';

@Component({
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule, AlternativeModalComponent]
})
export class ListComponent {

  alternatives = signal<Alternative[]>([]);
  questions = signal<any[]>([]);

  modalVisible = signal(false);
  editingItem = signal<Alternative | null>(null);

  constructor(
    private service: AlternativesService,
    private questionService: QuestionService
  ) {

    this.service.getAlternatives().subscribe(data => {
      this.alternatives.set(
        data.map((alt: any) => ({
          id: alt.id,
          text: alt.text,
          isCorrect: alt.isCorrect,
          questionId: alt.questionId ?? alt.question_id ?? alt.questionUuid,
        }))
      );
    });

    this.questionService.getQuestions().subscribe((data) => {
      this.questions.set(data);
    });
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
      this.service.updateAlternative(this.editingItem()!.id, data);
    } else {
      this.service.createAlternative(data);
    }

    this.modalVisible.set(false);
  }

  delete(id: string) {
    this.service.deleteAlternative(id);
  }

  getQuestionText(id: string): string {
    const q = this.questions().find((q: any) => q.id === id);
    return q ? q.text : '';
  }
}
