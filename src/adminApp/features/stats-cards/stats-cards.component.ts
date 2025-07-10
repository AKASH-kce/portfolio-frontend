import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-stats-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.scss'
})
export class StatsCardsComponent {
  stats = [
    { icon: 'fas fa-users', label: 'Total Users', value: 1248, color: 'primary' },
    { icon: 'fas fa-user-check', label: 'Active Today', value: 842, color: 'success' },
    { icon: 'fas fa-user-plus', label: 'New This Week', value: 156, color: 'info' },
    { icon: 'fas fa-user-clock', label: 'Pending Verification', value: 18, color: 'warning' }
  ];
} 