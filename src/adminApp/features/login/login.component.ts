import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BubbleService } from '../../../app/core/services/bubble.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;


  private readonly ADMIN_EMAIL = 'admin@portfolio.com';
  private readonly ADMIN_PASSWORD = 'admin123';

  constructor(
    private router: Router,
    private bubbleService: BubbleService
  ) {}

  ngOnInit() {
    // Add admin-dashboard class to body
    document.body.classList.add('admin-dashboard');
  }
  
  ngOnDestroy() {
    // Remove admin-dashboard class from body
    document.body.classList.remove('admin-dashboard');
  }

  onLogin() {
    this.isLoading = true;
    
    setTimeout(() => {
      if (this.email === this.ADMIN_EMAIL && this.password === this.ADMIN_PASSWORD) {
    
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminEmail', this.email);
        
        this.router.navigate(['/admin/dashboard']);
      } else {
        // Show error message
        this.bubbleService.show('Invalid credentials. Admin access only.');
        
        // Navigate to home page
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      }
      this.isLoading = false;
    }, 1000);
  }

  isFormValid(): boolean {
    return this.email.trim() !== '' && this.password.trim() !== '';
  }
} 