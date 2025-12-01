import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoriesService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';

@Component({
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class HomeComponent {
  categories = signal<Category[]>([]);

  constructor(private categoryService: CategoriesService) {
    this.categoryService.getCategories().subscribe(cats => {
      this.categories.set(cats);
    });
  }
}
