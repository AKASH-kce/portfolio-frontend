import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface SocialLink {
  icon: string;
  url: string;
  comingSoon?: boolean;
}

@Component({
  selector: 'app-profile-card',
  imports: [CommonModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() name = 'Akash S';
  @Input() title = 'Software Engineer';
  @Input() image = 'assets/akashProfile.JPG';
  @Input() description = 'Software Engineer at ClaySys Technologies. Experienced in full-stack development, passionate about building modern web apps.';
  @Input() socialLinks: SocialLink[] = [];
  @Output() comingSoon = new EventEmitter<{link: any, event: MouseEvent}>();

  isFlipped = false;

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}