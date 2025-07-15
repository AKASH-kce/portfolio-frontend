import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'admin-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

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