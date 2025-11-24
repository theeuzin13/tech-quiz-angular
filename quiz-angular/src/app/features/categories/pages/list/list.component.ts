import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  categories = [
    { id: 1, name: 'Programming', icon: 'Code' },
    { id: 2, name: 'Networks', icon: 'Network' },
    { id: 3, name: 'Hardware', icon: 'Cpu' },
    { id: 4, name: 'Artificial Intelligence', icon: 'Brain' },
    { id: 5, name: 'Security', icon: 'Shield' },
    { id: 6, name: 'Databases', icon: 'Database' },
  ];

}
