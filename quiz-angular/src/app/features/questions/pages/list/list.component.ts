import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionModalComponent } from '../../components/question-modal/question-modal.component';
import { QuestionService } from '../../../../core/services/question.service';
import { CategoriesService } from '../../../../core/services/category.service';
import { AlertService } from '../../../../shared/utils/alert.service';

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [CommonModule, QuestionModalComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  questions = signal<any[]>([]);
  categories = signal<any[]>([]);

  modalVisible = signal(false);
  editingItem = signal<any | null>(null);

  constructor(
    private questionService: QuestionService,
    private categoryService: CategoriesService,
    private alert: AlertService
  ) {
    this.loadQuestions();
    this.loadCategories();
  }

  loadQuestions() {
    this.questionService.getQuestions().subscribe((data) => {
      console.log('Fetched questions:', data);
      const formatted = data.map(q => ({
        id: q.id,
        description: q.description,
        categoryId: q.categoryId,
        categoryName: q.categoryName
      }));

      this.questions.set(formatted);
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      const formatted = data.map(c => ({
        id: c.uuid,
        name: c.name
      }));

      this.categories.set(formatted);
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
    if (data.id) {
      this.questionService.updateQuestion(
        data.id,
        data.description,
        data.categoryId
      ).subscribe(() => {
        this.loadQuestions();
        this.modalVisible.set(false);
      });

    } else {
      this.questionService.createQuestion(
        data.description,
        data.categoryId
      ).subscribe(() => {
        this.loadQuestions();
        this.modalVisible.set(false);
      });
    }
  }

  deleteQuestion(id: string) {
    this.alert.confirm('Deseja realmente excluir esta pergunta?')
      .then(result => {
        if (!result.isConfirmed) return;
        console.log('Deleting question with id:', id);
        this.questionService.deleteQuestion(id).subscribe({
          next: () => {
            this.loadQuestions();
            this.alert.success('Pergunta excluída com sucesso!');
          },
          error: (err) => {
            console.log(err);
            this.alert.error(err.error.message || 'Erro ao excluir pergunta.');
          }
        });
      });
  }
}
