import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Iskills {
  name: string;
  icon: string;
  level: string;
}

export interface Icategory {
  name: string;
  icon: string;
  skills: Iskills[];
}

@Component({
  selector: 'app-skill-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './skill-category.component.html',
  styleUrl: './skill-category.component.scss'
})
export class SkillCategoryComponent {
  @Input() category!: Icategory;
}
