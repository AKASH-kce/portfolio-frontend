import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from '../profile-card.component/profile-card.component';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, ProfileCardComponent],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss'
})
export class HeroSection {

}
