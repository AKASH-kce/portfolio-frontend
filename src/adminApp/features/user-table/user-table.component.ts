import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  users = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', location: 'New York, USA', status: 'Active', lastActive: '2 minutes ago' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', location: 'London, UK', status: 'Active', lastActive: '15 minutes ago' },
    { id: 3, name: 'Michael Chen', email: 'michael.c@example.com', location: 'Beijing, China', status: 'Inactive', lastActive: '3 days ago' }
  ];

  onView(user: any) {
    console.log('View user:', user);
  }

  onEdit(user: any) {
    console.log('Edit user:', user);
  }

  onDelete(user: any) {
    console.log('Delete user:', user);
  }
} 