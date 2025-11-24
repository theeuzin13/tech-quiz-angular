import { Component, signal } from '@angular/core';
import { CategoryModalComponent } from '../../components/category-modal/category-modal.component';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-category-list',
  imports: [NgFor, CategoryModalComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  modalVisible = signal(false);
  editingItem = signal<any | null>(null);

  categories = [
    { id: 1, name: 'Programming', icon: 'Code' },
    { id: 2, name: 'Networks', icon: 'Network' },
    { id: 3, name: 'Hardware', icon: 'Cpu' },
  ];

  openCreate() {
    this.editingItem.set(null);
    this.modalVisible.set(true);
  }

  openEdit(item: any) {
    this.editingItem.set(item);
    this.modalVisible.set(true);
  }

  saveCategory(data: any) {
    if (data.id) {
      const index = this.categories.findIndex(c => c.id === data.id);
      this.categories[index] = data;
    } else {
      this.categories.push({
        id: this.categories.length + 1,
        ...data
      });
    }
    this.modalVisible.set(false);
  }
}
