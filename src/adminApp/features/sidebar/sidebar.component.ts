import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navLinks = [
    { icon: 'fas fa-users', label: 'User Management', route: '/admin/dashboard', active: true },
    { icon: 'fas fa-chart-line', label: 'Analytics', route: '/admin/analytics', active: false },
    { icon: 'fas fa-cog', label: 'Settings', route: '/admin/settings', active: false },
    { icon: 'fas fa-sign-out-alt', label: 'Logout', route: '/admin/logout', active: false }
  ];
} 