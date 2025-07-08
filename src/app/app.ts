import { Component, AfterViewInit, Renderer2, ElementRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { Footer } from './shared/components/footer/footer.component';
import { ContactBubbleComponent } from './shared/components/contact-bubble.component';
import { ContactPopupComponent } from './shared/components/contact-popup.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, Footer, ContactBubbleComponent, ContactPopupComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef, private http: HttpClient) {}

  protected title = 'portfolio-client-app';
  showContactPopup = false;
  popupStartX = 0;
  popupStartY = 0;

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
    // Call backend to log visit and send email
    this.http.get('https://localhost:7155/api/contact/Visit').subscribe({
      next: () => {},
      error: (err) => { console.error('Visit logging failed', err); }
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
