import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username = '';
  password = '';
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login(event: Event) {
    event.preventDefault();
    this.loading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.access_token);
        this.loading = false;
        this.router.navigate(['/admin/categories']);
      },
      error: () => {
        this.loading = false;
        alert('Invalid credentials');
      }
    });
  }
}