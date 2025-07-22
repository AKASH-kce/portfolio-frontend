import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { ComingSoonBubbleComponent } from './coming-soon-bubble.component';
import { ComingSoonBubbleComponent } from '../coming-soon-bubble.component/coming-soon-bubble.component';
import { BubbleService } from '../../../core/services/bubble.service';
import { Subscription } from 'rxjs';
import { Resume } from '../../../features/resume/resume';
@Component({
  selector: 'app-navbar',
  imports:[ThemeToggleComponent, CommonModule, RouterModule, ComingSoonBubbleComponent,Resume],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  profileImage = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';

  isMenuOpen = false;
  showComingSoonBubble = false;
  comingSoonMessage = 'Coming Soon';
  private bubbleSubscription?: Subscription;

  constructor(private bubbleService: BubbleService) {}

  ngOnInit() {
    this.bubbleSubscription = this.bubbleService.bubble$.subscribe(message => {
      console.log('Bubble message received:', message); // Debug log
      this.comingSoonMessage = message;
      this.showComingSoonBubble = true;
      
      // Hide bubble after 3 seconds
      setTimeout(() => {
        this.showComingSoonBubble = false;
      }, 3000);
    });
  }

  ngOnDestroy() {
    if (this.bubbleSubscription) {
      this.bubbleSubscription.unsubscribe();
    }
  }

  implementedSections = [
    'home',
    'projects',
    'skills',
    'experience',
    'contact',
    'resume'
  ];


  implementedRoutes: string[] = [
    'admin'
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Hide/show contact bubble based on menu state
    const contactBubble = document.querySelector('.contact-bubble') as HTMLElement;
    if (contactBubble) {
      if (this.isMenuOpen) {
        contactBubble.style.display = 'none';
      } else {
        contactBubble.style.display = 'flex';
      }
    }
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    this.isMenuOpen = false;
    
    // Show contact bubble when menu closes
    const contactBubble = document.querySelector('.contact-bubble') as HTMLElement;
    if (contactBubble) {
      contactBubble.style.display = 'flex';
    }
    
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
    console.log('showComingSoon called'); // Debug log
    this.bubbleService.show('Coming Soon');
    
    // Close menu and show contact bubble
    this.isMenuOpen = false;
    const contactBubble = document.querySelector('.contact-bubble') as HTMLElement;
    if (contactBubble) {
      contactBubble.style.display = 'flex';
    }
  }
  showResumeModal:boolean=false;
  openResume(){
   this.showResumeModal=true;
  }
  closeResumeModal(){
    this.showResumeModal=false;
  }
}