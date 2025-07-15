import { Component, Output, EventEmitter } from '@angular/core';
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

  @Output() openMassEmail = new EventEmitter<void>();

  triggerMassEmailModal() {
    this.openMassEmail.emit();
  }
} 