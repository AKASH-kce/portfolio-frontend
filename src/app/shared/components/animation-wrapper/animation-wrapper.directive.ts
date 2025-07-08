import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]'
})
export class AnimationWrapperDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.el.nativeElement);
  }
}