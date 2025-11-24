import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionModalComponent } from '../../components/question-modal/question-modal.component';

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [CommonModule, QuestionModalComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  questions = [
    { id: 1, text: 'What does HTML stand for?', category: 'Programming' },
    { id: 2, text: 'Which protocol is used for secure web browsing?', category: 'Networks' },
    { id: 3, text: 'What is the main function of a CPU?', category: 'Hardware' },
    { id: 4, text: 'What type of learning uses labeled data?', category: 'Artificial Intelligence' },
    { id: 5, text: 'What does SQL stand for?', category: 'Databases' },
  ];

  categories = [
    'Programming',
    'Networks',
    'Hardware',
    'Artificial Intelligence',
    'Security',
    'Databases'
  ];

  modalVisible = signal(false);
  editingItem = signal<any | null>(null);

  openCreate() {
    this.editingItem.set(null);
    this.modalVisible.set(true);
  }

  openEdit(item: any) {
    this.editingItem.set(item);
    this.modalVisible.set(true);
  }

  saveQuestion(data: any) {
    if (data.id) {
      // edição
      const idx = this.questions.findIndex(q => q.id === data.id);
      this.questions[idx] = data;
    } else {
      // criação
      this.questions.push({
        ...data,
        id: this.questions.length + 1
      });
    }

    this.modalVisible.set(false);
  }
}
