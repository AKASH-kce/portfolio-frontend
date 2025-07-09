import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone:true,
  template: `
    <label class="theme-switch">
      <input type="checkbox" [checked]="!isDarkMode" (change)="toggleTheme()" />
      <span class="slider">
        <span class="thumb">
          <span class="icon">{{ isDarkMode ? '🌙' : '☀️' }}</span>
        </span>
      </span>
    </label>
  `,
  styles: [`
    .theme-switch {
      display: inline-block;
      position: relative;
      width: 54px;
      height: 28px;
      vertical-align: middle;
    }
    .theme-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(90deg, #e0e7ef 60%, #ffe066 100%);
      border-radius: 28px;
      transition: background 0.4s;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      display: flex;
      align-items: center;
      padding: 0 4px;
    }
    .thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 22px;
      height: 22px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 1px 4px rgba(0,0,0,0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), background 0.4s;
      z-index: 2;
    }
    .icon {
      pointer-events: none;
      user-select: none;
    }
    .theme-switch input:checked + .slider {
      background: linear-gradient(90deg, #23243a 60%, #181824 100%);
    }
    .theme-switch input:checked + .slider .thumb {
      transform: translateX(26px);
      background: #23243a;
      color: #ffe066;
    }
    .theme-switch input:not(:checked) + .slider .thumb {
      background: #fffbe6;
      color: #f7b801;
    }
  `]
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode = true;

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isDarkMode = false;
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    } else {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
    // Update bubble backgrounds
    setTimeout(() => {
      const bubbles = document.querySelectorAll('.bubble-bg .bubble');
      bubbles.forEach(bubble => {
        if (this.isDarkMode) {
          (bubble as HTMLElement).style.background = 'linear-gradient(135deg, #8a2be2 60%, #00c9ff 100%)';
          (bubble as HTMLElement).style.opacity = '0.18';
        } else {
          (bubble as HTMLElement).style.background = 'linear-gradient(135deg, #34d399 60%, #fde047 100%)'; // green/yellow
          (bubble as HTMLElement).style.opacity = '0.38';
        }
      });
    }, 10);
  }
} 