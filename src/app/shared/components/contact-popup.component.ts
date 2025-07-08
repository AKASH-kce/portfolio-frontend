import { Component, EventEmitter, Input, Output, ElementRef, Renderer2, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="contact-popup-3d" *ngIf="open">
      <div class="sphere-popup-wrapper">
        <div class="sphere-popup" (click)="toggleRotate()" [class.sphere-rotate]="rotatingSphere" [class.sphere-exit]="closing">
          <div class="cube-cat-3d glassy-cat">
            <div class="cat-halo"></div>
            <svg class="cat-glass-shadow" width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="40" cy="12" rx="32" ry="8" fill="#fff" fill-opacity="0.32"/>
            </svg>
            <svg width="70" height="60" viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="35" cy="40" rx="22" ry="16" fill="#F9D29D" fill-opacity="0.85"/>
              <ellipse cx="25" cy="20" rx="8" ry="10" fill="#F9D29D" fill-opacity="0.85"/>
              <ellipse cx="45" cy="20" rx="8" ry="10" fill="#F9D29D" fill-opacity="0.85"/>
              <ellipse cx="20" cy="10" rx="4" ry="6" fill="#F9D29D" fill-opacity="0.85"/>
              <ellipse cx="50" cy="10" rx="4" ry="6" fill="#F9D29D" fill-opacity="0.85"/>
              <ellipse cx="35" cy="45" rx="10" ry="6" fill="#fff" fill-opacity="0.7"/>
              <ellipse cx="31" cy="38" rx="2" ry="3" fill="#222" fill-opacity="0.85"/>
              <ellipse cx="39" cy="38" rx="2" ry="3" fill="#222" fill-opacity="0.85"/>
              <ellipse cx="35" cy="50" rx="2.5" ry="1.2" fill="#E5A76C" fill-opacity="0.85"/>
              <ellipse cx="28" cy="18" rx="1.2" ry="2" fill="#222" fill-opacity="0.85"/>
              <ellipse cx="42" cy="18" rx="1.2" ry="2" fill="#222" fill-opacity="0.85"/>
              <path d="M33 44 Q35 46 37 44" stroke="#E5A76C" stroke-width="1.2" fill="none"/>
            </svg>
          </div>
          <div class="sphere-bubbles">
            <div class="sphere-bubble b1"></div>
            <div class="sphere-bubble b2"></div>
            <div class="sphere-bubble b3"></div>
            <div class="sphere-bubble b4"></div>
            <div class="sphere-bubble b5"></div>
          </div>
          <div class="sphere-content">
            <button class="popup-close" (click)="onCloseClick($event)" aria-label="Close">
              <span class="flower-icon">
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <circle cx="19" cy="19" r="6" fill="#e52e71"/>
                    <ellipse cx="19" cy="6" rx="4" ry="7" fill="#fff8"/>
                    <ellipse cx="19" cy="32" rx="4" ry="7" fill="#fff8"/>
                    <ellipse cx="6" cy="19" rx="7" ry="4" fill="#fff8"/>
                    <ellipse cx="32" cy="19" rx="7" ry="4" fill="#fff8"/>
                    <ellipse cx="10" cy="10" rx="4" ry="7" transform="rotate(-45 10 10)" fill="#fff8"/>
                    <ellipse cx="28" cy="28" rx="4" ry="7" transform="rotate(-45 28 28)" fill="#fff8"/>
                    <ellipse cx="28" cy="10" rx="7" ry="4" transform="rotate(45 28 10)" fill="#fff8"/>
                    <ellipse cx="10" cy="28" rx="7" ry="4" transform="rotate(45 10 28)" fill="#fff8"/>
                  </g>
                  <g class="rose-x">
                    <g transform="rotate(0 19 19)">
                      <line x1="15" y1="15" x2="23" y2="23" />
                      <line x1="23" y1="15" x2="15" y2="23" />
                    </g>
                    <g transform="rotate(36 19 19)">
                      <line x1="15" y1="15" x2="23" y2="23" />
                      <line x1="23" y1="15" x2="15" y2="23" />
                    </g>
                    <g transform="rotate(72 19 19)">
                      <line x1="15" y1="15" x2="23" y2="23" />
                      <line x1="23" y1="15" x2="15" y2="23" />
                    </g>
                    <g transform="rotate(108 19 19)">
                      <line x1="15" y1="15" x2="23" y2="23" />
                      <line x1="23" y1="15" x2="15" y2="23" />
                    </g>
                    <g transform="rotate(144 19 19)">
                      <line x1="15" y1="15" x2="23" y2="23" />
                      <line x1="23" y1="15" x2="15" y2="23" />
                    </g>
                  </g>
                </svg>
              </span>
            </button>
            <h2 class="popup-title">Contact Me</h2>
            <p class="popup-info">
              <a href="https://wa.me/916374252235?text=Hi%20Akash!%20I%20found%20your%20portfolio." target="_blank" class="popup-link">
                <i class="fa-solid fa-phone"></i> +91 6374252235
              </a>
            </p>
            <p class="popup-info">
              <a href="https://www.instagram.com/_itz_me_akash_3?igsh=MXV5ZjM4MmlmdTloYQ%3D%3D&utm_source=qr" target="_blank" class="popup-link">
                <i class="fa-brands fa-instagram"></i> _king_of_haters_33
              </a>
            </p>
            <p class="popup-info">
              <a href="https://www.linkedin.com/in/akash-s-4685aa269" target="_blank" class="popup-link">
                <i class="fa-brands fa-linkedin"></i> AKASH S
              </a>
            </p>
            <a href="mailto:akashkce123@gmail.com" class="cta-button popup-cta"><i class="fas fa-envelope"></i> Email Me</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./contact-popup.component.scss']
})
export class ContactPopupComponent implements AfterViewInit, OnChanges {
  @Input() open = false;
  @Input() startX = 0;
  @Input() startY = 0;
  @Output() close = new EventEmitter<void>();
  rotatingSphere = false;
  closing = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setPopupPositionVars();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open'] || changes['startX'] || changes['startY']) {
      if (this.open) {
        setTimeout(() => this.setPopupPositionVars(), 0);
      }
    }
  }

  setPopupPositionVars() {
    const popup = this.el.nativeElement.querySelector('.sphere-popup') as HTMLElement;
    if (popup) {
      this.renderer.setStyle(popup, '--popup-start-x', this.startX + 'px');
      this.renderer.setStyle(popup, '--popup-start-y', this.startY + 'px');
    }
  }

  toggleRotate() {
    this.rotatingSphere = !this.rotatingSphere;
  }

  onCloseClick(event: Event) {
    event.stopPropagation();
    if (this.closing) return;
    this.closing = true;
    this.setPopupPositionVars();
    setTimeout(() => {
      this.closing = false;
      this.close.emit();
    }, 700);
  }
} 