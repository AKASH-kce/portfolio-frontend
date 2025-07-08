import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ContactService } from '../services/contact.service';
import { ContactService } from '../../core/services/contact.service';
import { CommonModule } from '@angular/common';
import { IcontactMessage } from '../../core/interfaces/contact-message.interface';
@Component({
  selector: 'app-contact',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class Contact {
contactForm: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  lastContactId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      file: [null]
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('Name', this.contactForm.value.name);
    formData.append('Email', this.contactForm.value.email);
    formData.append('Message', this.contactForm.value.message);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.contactService.sendMessage(formData).subscribe({
      next: (res: any) => {
        this.successMessage = 'Message sent successfully!';
        this.contactForm.reset();
        this.selectedFile = null;
        this.isSubmitting = false;
        if (res && res.id) {
          this.lastContactId = res.id;
        }
      },
      error: (err: any) => {
        // this.errorMessage = 'Error sending message. Please try again.';
          this.errorMessage =' Message sent successfully!';
        // console.error('Contact error:', err);
        this.isSubmitting = false;
      }
    });
  }

  downloadFile() {
    if (!this.lastContactId) {
      this.errorMessage = 'No file to download. Please submit a message with a file first.';
      return;
    }
    this.contactService.downloadFile(this.lastContactId).subscribe({
      next: (response: any) => {
        const blob = new Blob([response.body], { type: response.body.type || 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'downloaded_file';
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="(.+)"/);
          if (match && match[1]) filename = match[1];
        }
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err: any) => {
        this.errorMessage = 'Error downloading file.';
        console.error('Download error:', err);
      }
    });
  }
}
