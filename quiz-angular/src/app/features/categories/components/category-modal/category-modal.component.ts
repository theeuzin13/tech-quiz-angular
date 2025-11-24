import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})
export class CategoryModalComponent {
  @Input() visible = false;
  @Input() data: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  name = '';
  icon = '';

  ngOnChanges() {
    if (this.data) {
      this.name = this.data.name;
      this.icon = this.data.icon;
    }
  }

  submit() {
    this.save.emit({
      id: this.data?.id,
      name: this.name,
      icon: this.icon,
    });
  }
}
