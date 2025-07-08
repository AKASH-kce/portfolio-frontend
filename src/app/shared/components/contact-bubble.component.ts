import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-bubble',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="contact-bubble" (click)="openPopup($event)" (mouseenter)="hovering = true" (mouseleave)="hovering = false">
      <span class="bubble-icons">
        <i *ngIf="!hovering" class="fa-regular fa-hand-point-right hand-animate" aria-label="Click here"></i>
        <i *ngIf="hovering" class="fa-regular fa-hand-wave hand-animate" aria-label="Wave"></i>
        <span class="emoji-with-speech">
          <span *ngIf="!hovering" class="speech-bubble cloud-bubble extra-cloud">Hire me!</span>
          <span class="speech-bubble cloud-bubble">Hire me!</span>
          <i class="fa-regular fa-face-laugh-beam"></i>
        </span>
      </span>
      <span>Contact Me!</span>
    </div>
  `,
  styleUrls: ['./contact-bubble.component.scss']
})
export class ContactBubbleComponent {
  @Output() showPopup = new EventEmitter<{x: number, y: number}>();
  hovering = false;

  openPopup(event: MouseEvent) {
    this.showPopup.emit({ x: event.clientX, y: event.clientY });
  }
} 