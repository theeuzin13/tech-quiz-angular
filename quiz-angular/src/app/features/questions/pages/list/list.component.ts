import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionModalComponent } from '../../components/question-modal/question-modal.component';
import { QuestionService } from '../../../../core/services/question.service';
import { CategoriesService } from '../../../../core/services/category.service';

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
    private categoryService: CategoriesService
  ) {
    this.loadQuestions();
    this.loadCategories();
  }

  loadQuestions() {
    this.questionService.getQuestions().subscribe((data) => {
      const formatted = data.map(q => ({
        id: q.uuid,
        description: q.description,
        categoryId: q.categoryId,
        category: q.category
      }));

      this.questions.set(formatted);
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      const formatted = data.map(c => ({
        id: c.id,
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

  delete(id: string) {
    this.questionService.deleteQuestion(id).subscribe(() => {
      this.loadQuestions();
    });
  }
}
