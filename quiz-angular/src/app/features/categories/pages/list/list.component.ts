import { Component, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { CategoryModalComponent } from '../../components/category-modal/category-modal.component';
import { CategoriesService } from '../../../../core/services/category.service';
import { AlertService } from '../../../../shared/utils/alert.service';

@Component({
  standalone: true,
  selector: 'app-category-list',
  imports: [NgFor, CategoryModalComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  modalVisible = signal(false);
  editingItem = signal<any | null>(null);

  categories = signal<any[]>([]);

  constructor(private categoryService: CategoriesService, private alert: AlertService) {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories.set(res);
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

  saveCategory(data: any) {
    if (data.id) {
      this.categoryService.updateCategory(data.id, data.name).subscribe(() => {
        this.loadCategories();
        this.modalVisible.set(false);
      });

    } else {
      this.categoryService.createCategory(data.name).subscribe(() => {
        this.loadCategories();
        this.modalVisible.set(false);
      });
    }
  }

  deleteCategory(id: string) {

    this.alert.confirm('Deseja realmente excluir esta categoria?')
      .then(result => {
        if (!result.isConfirmed) return;

        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            this.loadCategories();
            this.alert.success('Categoria excluída com sucesso!');
          },
          error: (err) => {
            this.alert.error(err.error.message || 'Erro ao excluir categoria.');
          }
        });
      });
  }
}
