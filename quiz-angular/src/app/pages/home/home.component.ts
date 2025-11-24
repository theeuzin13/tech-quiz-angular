import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  categories = [
    { id: 1, name: 'Programming' },
    { id: 2, name: 'Networks' },
    { id: 3, name: 'Hardware' },
    { id: 4, name: 'Artificial Intelligence' },
    { id: 5, name: 'Security' },
    { id: 6, name: 'Databases' },
  ];

}
