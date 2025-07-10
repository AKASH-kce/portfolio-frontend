import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'admin-mass-email-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mass-email-modal.component.html',
  styleUrl: './mass-email-modal.component.scss'
})
export class MassEmailModalComponent {
  emailSubject = '';
  emailMessage = '';
  includeInactive = true;
  isSending = false;
  progress = 100;

  onSubmit() {
    this.isSending = true;
    this.progress = 0;

    const interval = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          this.isSending = false;
          this.resetForm();
        }, 1500);
      }
    }, 100);
  }

  resetForm() {
    this.emailSubject = '';
    this.emailMessage = '';
    this.includeInactive = true;
    this.progress = 100;
  }
} 