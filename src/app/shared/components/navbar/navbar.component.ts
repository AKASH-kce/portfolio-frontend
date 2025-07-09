import { Component, Output, EventEmitter } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle.component';
import { CommonModule } from '@angular/common';
// import { ComingSoonBubbleComponent } from './coming-soon-bubble.component';
import { ComingSoonBubbleComponent } from '../coming-soon-bubble.component/coming-soon-bubble.component';
import { BubbleService } from '../../../core/services/bubble.service';
@Component({
  selector: 'app-navbar',
  imports:[ThemeToggleComponent, CommonModule, ComingSoonBubbleComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  profileImage = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';

  isMenuOpen = false;
  showComingSoonBubble = false;
  comingSoonMessage = 'Coming Soon';

  constructor(private bubbleService: BubbleService) {}

  // List of implemented sections (IDs for anchor links)
  implementedSections = [
    'home',
    'projects',
    'skills',
    'experience',
    'contact'
  ];

  // List of implemented router links
  implementedRoutes: string[] = [
    // Add route names (e.g., 'resume', 'testimonials', 'gallery') ONLY if actually implemented
    // None are implemented yet, so leave empty
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    this.isMenuOpen = false;
    if (this.implementedSections.includes(sectionId)) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.focus && el.focus();
      }
    } else {
      this.showComingSoon();
    }
  }

  showComingSoon() {
    this.bubbleService.show('Coming Soon');
  }
}