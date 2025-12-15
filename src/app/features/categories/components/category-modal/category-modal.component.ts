import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { iconList } from '../../../../shared/utils/category-icons';

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

  form: any = {
    name: '',
    icon: ''
  };

  icons = iconList;

  ngOnChanges() {
    if (this.data) {
      this.form = {
        uuid: this.data.uuid,
        name: this.data.name,
        icon: this.data.icon
      };
    } else {
      this.form = {
        uuid: null,
        name: '',
        icon: 'fa-solid fa-code'
      };
    }
  }

  submit() {
    this.save.emit(this.form);
  }
}
