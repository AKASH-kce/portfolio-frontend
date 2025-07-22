import { Component, HostListener } from '@angular/core';
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
  sidebarOpen = false;
  isMobile = false;

  navLinks = [
    { icon: 'fas fa-users', label: 'User Management', route: '/admin/dashboard' },
    { icon: 'fas fa-chart-line', label: 'Analytics', route: '/admin/analytics' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/admin/settings' },
    { icon: 'fas fa-sign-out-alt', label: 'Logout', route: '/admin/logout' }
  ];

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.sidebarOpen = true;
    } else {
      this.sidebarOpen = false;
    }
  }

  openSidebar() {
    if (this.isMobile) this.sidebarOpen = true;
  }

  closeSidebar() {
    if (this.isMobile) this.sidebarOpen = false;
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }

  onNavLinkClick() {
    this.closeSidebar();
  }
} 