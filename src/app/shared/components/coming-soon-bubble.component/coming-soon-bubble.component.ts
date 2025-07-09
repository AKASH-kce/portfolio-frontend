import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-coming-soon-bubble',
  standalone: true,
  imports:[CommonModule],
  templateUrl:'coming-soon-bubble.component.html',
  styleUrls: ['./coming-soon-bubble.component.scss']
})
export class ComingSoonBubbleComponent {
  @Input() show = false;
  @Input() message = 'Coming Soon';
} 