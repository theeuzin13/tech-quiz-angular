import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AlternativesService } from '../../../../core/services/alternative.service';
import { QuestionService } from '../../../../core/services/question.service';
import { AlternativeModalComponent } from '../../components/alternatives-modal/alternative-modal.component';
import { AlertService } from '../../../../shared/utils/alert.service';  // se estiver usando SweetAlert

@Component({
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule, AlternativeModalComponent]
})
export class ListComponent {

  alternatives = signal<any[]>([]);
  questions = signal<any[]>([]);

  modalVisible = signal(false);
  editingItem = signal<any | null>(null);

  constructor(
    private service: AlternativesService,
    private questionService: QuestionService,
    private alert: AlertService
  ) {
    this.loadAlternatives();
    this.loadQuestions();
  }

  loadAlternatives() {
    this.service.getAlternatives().subscribe(data => {
      console.log('Fetched alternatives:', data);
      this.alternatives.set(
        data.map((alt: any) => ({
          id: alt.uuid,
          text: alt.text,
          isCorrect: alt.isCorrect,
          questionId: alt.questionId,
        }))
      );
    });
  }

  loadQuestions() {
    this.questionService.getQuestions().subscribe(data => {
      this.questions.set(data);
    });
  }

  openCreate() {
    this.editingItem.set(null);
    this.modalVisible.set(true);
  }

  openEdit(item: any) {
    this.editingItem.set(item);
    this.modalVisible.set(true);
  }

  save(data: any) {
    console.log('Saving alternative:', data);
    const payload = {
      id : data.id,
      text: data.text,
      isCorrect: data.isCorrect,
      questionId: data.questionId
    };

    if (this.editingItem()) {
      const id = this.editingItem()!.id;

      this.service.updateAlternative(id, payload).subscribe({
        next: () => {
          this.alert.success("Alternative updated!");
          this.modalVisible.set(false);
          this.loadAlternatives();
        },
        error: () => {
          this.alert.error("Failed to update alternative");
        }
      });

      return;
    }

    this.service.createAlternative(payload).subscribe({
      next: () => {
        this.alert.success("Alternative created!");
        this.modalVisible.set(false);
        this.loadAlternatives();
      },
      error: () => {
        this.alert.error("Failed to create alternative");
      }
    });
  }

  delete(id: string) {
    this.alert.confirm("Delete this alternative?").then(res => {
      if (!res.isConfirmed) return;

      this.service.deleteAlternative(id).subscribe({
        next: () => {
          this.alert.success("Alternative deleted!");
          this.loadAlternatives();
        }
      });
    });
  }

  getQuestionText(id: string): string {
    const q = this.questions().find(q => q.id === id);
    return q ? q.description : '--';
  }
}
