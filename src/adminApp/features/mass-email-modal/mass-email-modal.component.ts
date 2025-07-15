import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

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
  errorMessage = '';

  @ViewChild('modalRef', { static: true }) modalRef!: ElementRef;

  constructor(private userService: UserService) {}

  openModal() {
    // Move modal to body for correct stacking
    if (this.modalRef && this.modalRef.nativeElement && this.modalRef.nativeElement.parentNode !== document.body) {
      document.body.appendChild(this.modalRef.nativeElement);
    }
    // @ts-ignore
    const modal = new bootstrap.Modal(this.modalRef.nativeElement, { backdrop: true, focus: true, keyboard: true });
    modal.show();
    document.body.classList.add('modal-open-no-anim');
  }

  closeModal() {
    // @ts-ignore
    const modal = bootstrap.Modal.getInstance(this.modalRef.nativeElement);
    if (modal) modal.hide();
    document.body.classList.remove('modal-open-no-anim');
  }

  onSubmit() {
    this.isSending = true;
    this.progress = 0;
    this.errorMessage = '';
    this.userService.sendMassEmail(this.emailSubject, this.emailMessage).subscribe({
      next: () => {
        this.progress = 100;
        setTimeout(() => {
          this.isSending = false;
          this.resetForm();
          this.closeModal();
        }, 1500);
      },
      error: (err) => {
        this.isSending = false;
        this.progress = 100;
        this.errorMessage = err?.error?.message || 'Failed to send email. Please try again.';
      }
    });
  }

  resetForm() {
    this.emailSubject = '';
    this.emailMessage = '';
    this.includeInactive = true;
    this.progress = 100;
  }
} 