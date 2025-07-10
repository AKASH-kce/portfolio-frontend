import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashBoard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashBoard.component.html',
  styleUrl: './dashBoard.component.scss'
})
export class dashBoardComponent {
  adminEmail: string = '';

  constructor(private router: Router) {
    this.adminEmail = localStorage.getItem('adminEmail') || '';
  }

  logout() {
    // Clear admin session
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    
    // Navigate to home page
    this.router.navigate(['/']);
  }
}