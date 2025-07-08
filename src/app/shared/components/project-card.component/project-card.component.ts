import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Project {
    title: string;
    description: string;
    icon: string;
    image: string;
    tags: string[];
}

@Component({
  selector: 'app-project-card',
  imports: [FormsModule, CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() project: any; // or the correct type
}
