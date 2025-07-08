import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements AfterViewInit {
  experiences = [
    {
      date: '2024-August <-> 2025-April',
      title: 'Product Engineer - Level 1',
      company: 'ClaySys Technologies, Kochi, Kerala, India',
      description: 'Full-time position, working on developing and optimizing web applications using modern technologies. Focused on backend APIs and frontend development.'
    },
    {
      date: '2025-May <-> Present',
      title: 'Product Engineer - Level 2',
      company: 'ClaySys Technologies, Kochi, Kerala, India',
      description: 'Full-time position, working on developing and optimizing web applications using modern technologies. Focused on backend APIs and frontend development.'
    }
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const section = this.el.nativeElement.querySelector('.experience-section');
    const items = this.el.nativeElement.querySelectorAll('.timeline-item');
    const reveal = () => {
      // Section animation
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          this.renderer.addClass(section, 'section-visible');
        }
      }
      // Timeline item animation
      items.forEach((item: HTMLElement) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          this.renderer.addClass(item, 'visible');
        }
      });
    };
    window.addEventListener('scroll', reveal);
    reveal();
  }
} 