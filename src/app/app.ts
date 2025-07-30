import { Component, AfterViewInit, Renderer2, ElementRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { Footer } from './shared/components/footer/footer.component';
import { ContactBubbleComponent } from './shared/components/contact-bubble.component';
import { ContactPopupComponent } from './shared/components/contact-popup.component';
import { HttpClient } from '@angular/common/http';
import { ComingSoonBubbleComponent } from './shared/components/coming-soon-bubble.component/coming-soon-bubble.component';
import { BubbleService } from './core/services/bubble.service';
import { MassEmailModalComponent } from '../adminApp/features/mass-email-modal/mass-email-modal.component';
import { FloatingBotComponent } from './shared/components/chat-bot/chat-bot.component';
import { ChatWindowComponent } from './shared/components/chat-window/chat-window.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule, NavbarComponent,FloatingBotComponent,ChatWindowComponent, Footer, ContactBubbleComponent, ContactPopupComponent,ComingSoonBubbleComponent,MassEmailModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private http: HttpClient,
    private bubbleService: BubbleService
  ) {
    this.bubbleService.bubble$.subscribe(message => this.showBubbleWithMessage(message));
  }

  protected title = 'portfolio-client-app';
  showContactPopup = false;
  popupStartX = 0;
  popupStartY = 0;

  showBubble = false;
  bubbleMessage = '';
isChatOpen = false;

openChatWindow() {
  this.isChatOpen = !this.isChatOpen;
}

  showBubbleWithMessage(message: string) {
    this.bubbleMessage = message;
    this.showBubble = true;
    setTimeout(() => this.showBubble = false, 2000);
  }

  async ngAfterViewInit() {
    const script = this.renderer.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = () => {
      // @ts-ignore
      window.particlesJS && window.particlesJS('particles-js', {
        particles: {
          number: { value: 100, density: { enable: true, value_area: 800 } },
          color: { value: '#ffffff' },
          shape: { type: 'circle' },
          opacity: { value: 0.1, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.05,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 }
          }
        },
        retina_detect: true
      });
    };
    this.renderer.appendChild(document.body, script);

    // Animate project cards
    setTimeout(() => {
      const cards = this.el.nativeElement.querySelectorAll('.project-card');
      cards.forEach((card: HTMLElement, index: number) => {
        card.style.animationDelay = `${index * 0.2}s`;
      });
    }, 0);

    // Animated bubbles background
    const bubbleBg = document.querySelector('.bubble-bg');
    if (bubbleBg) {
      for (let i = 0; i < 18; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 60 + 40; 
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${12 + Math.random() * 10}s`;
        bubble.style.animationDelay = `${Math.random() * 10}s`;
        bubbleBg.appendChild(bubble);
      }
    }

    // Global wave splash effect
    const globalWave = document.querySelector('.global-wave-container') as HTMLElement;
    let lastScrollY = window.scrollY;
    let waveTimeout: any;
    const waveSplash = () => {
      if (globalWave) {
        const scrollDelta = window.scrollY - lastScrollY;
        const splash = Math.max(-18, Math.min(18, scrollDelta * 1.2));
        this.renderer.setStyle(globalWave, '--global-wave-y', `${splash}px`);
        clearTimeout(waveTimeout);
        waveTimeout = setTimeout(() => {
          this.renderer.setStyle(globalWave, '--global-wave-y', `0px`);
        }, 350);
        lastScrollY = window.scrollY;
      }
    };
    window.addEventListener('scroll', waveSplash);
  }

  ngOnInit() {
  const isFirstVisit = localStorage.getItem('firstVisit') !== 'true';
  if (isFirstVisit) {
    const clickHandler = () => {
      this.wellComeSound();
      window.removeEventListener('click', clickHandler);
      window.removeEventListener('touchstart', clickHandler);
    };
    window.addEventListener('click', clickHandler);
    window.addEventListener('touchstart', clickHandler);
  }

  this.http.get('https://portfolio-backend-docker-isvl.onrender.com/api/contact/Visit').subscribe({
    next: () => {},
    error: (err) => { console.error('Visit logging failed', err); }
  });
}


wellComeSound(): void {
  const audio = new Audio('assets/wellcome.mp3');
  audio.play().catch((error) => {
    console.warn('AutoPlay blocked', error);
  });
}

  openContactPopup(coords?: {x: number, y: number}) {
    if (coords) {
      // Calculate the center of the popup
      const popupWidth = 340;
      const popupHeight = 340;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Offset from click to popup center
      this.popupStartX = coords.x - centerX;
      this.popupStartY = coords.y - centerY;
    } else {
      // Default to center if no coords
      this.popupStartX = 0;
      this.popupStartY = 0;
    }
    this.showContactPopup = true;
  }

  closeContactPopup() {
    this.showContactPopup = false;
  }
}
