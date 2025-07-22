import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'User Management';

  @Output() massEmail = new EventEmitter<void>();

  triggerMassEmailModal() {
    this.massEmail.emit();
  }
} 