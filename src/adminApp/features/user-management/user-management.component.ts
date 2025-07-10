import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { UserTableComponent } from '../user-table/user-table.component';
import { MassEmailModalComponent } from '../mass-email-modal/mass-email-modal.component';

@Component({
  selector: 'admin-user-management',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    StatsCardsComponent,
    UserTableComponent,
    MassEmailModalComponent
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit, OnDestroy {
  // Main dashboard component that brings all other components together
  
  ngOnInit() {
    // Add admin-dashboard class to body
    document.body.classList.add('admin-dashboard');
  }
  
  ngOnDestroy() {
    // Remove admin-dashboard class from body
    document.body.classList.remove('admin-dashboard');
  }
} 