import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './features/sidebar/sidebar.component';

@Component({
  selector: 'admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="admin-layout">
      <admin-sidebar></admin-sidebar>
      <div class="admin-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrl: './adminApp.scss'
})
export class AdminLayoutComponent {}