import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    // Login fake por enquanto
    if (this.username === 'admin' && this.password === '123') {
      this.router.navigate(['/admin/categories']);
    } else {
      alert('Invalid credentials');
    }
  }
}
