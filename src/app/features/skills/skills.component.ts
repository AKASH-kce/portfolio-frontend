import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkillCategoryComponent } from '../../shared/components/skill-category.component/skill-category.component';

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
  selector: 'app-skills',
  standalone: true,
  imports: [FormsModule, CommonModule, SkillCategoryComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  skillCategories = [
    {
      name: 'Programming Languages',
      icon: 'fa-code',
      skills: [
        { name: 'JavaScript (ES6+)', icon: 'fa-js', level: 'Expert' },
        { name: 'Java', icon: 'fa-java', level: 'Advanced' },
        { name: 'C', icon: 'fa-cuttlefish', level: 'Advanced' }
      ]
    },
    {
      name: 'Frontend',
      icon: 'fa-desktop',
      skills: [
        { name: 'React.js', icon: 'fa-react', level: 'Expert' },
        { name: 'Angular', icon: 'fa-angular', level: 'Advanced' },
        { name: 'HTML5', icon: 'fa-html5', level: 'Expert' },
        { name: 'CSS', icon: 'fa-css3-alt', level: 'Expert' }
      ]
    },
    {
      name: 'Backend',
      icon: 'fa-server',
      skills: [
        { name: 'Node.js', icon: 'fa-node-js', level: 'Expert' },
        { name: 'Express.js', icon: 'fa-js', level: 'Advanced' },
        { name: '.NET', icon: 'fa-dot-circle', level: 'Intermediate' },
        { name: 'C#', icon: 'fa-cuttlefish', level: 'Intermediate' }
      ]
    },
    {
      name: 'Databases',
      icon: 'fa-database',
      skills: [
        { name: 'MongoDB', icon: 'fa-database', level: 'Advanced' },
        { name: 'SQL', icon: 'fa-database', level: 'Advanced' }
      ]
    },
    {
      name: 'Frameworks & Libraries',
      icon: 'fa-layer-group',
      skills: [
        { name: 'MERN Stack', icon: 'fa-layer-group', level: 'Advanced' },
        { name: 'Express.js', icon: 'fa-js', level: 'Advanced' },
        { name: 'React.js', icon: 'fa-react', level: 'Expert' },
        { name: 'Node.js', icon: 'fa-node-js', level: 'Expert' }
      ]
    },
    {
      name: 'Tools & Technologies',
      icon: 'fa-tools',
      skills: [
        { name: 'Visual Studio', icon: 'fa-windows', level: 'Advanced' },
        { name: 'Visual Studio (C#)', icon: 'fa-windows', level: 'Advanced' },
        { name: 'Eclipse', icon: 'fa-sun', level: 'Intermediate' },
        { name: 'GitHub', icon: 'fa-github', level: 'Expert' },
        { name: 'Postman', icon: 'fa-paper-plane', level: 'Advanced' }
      ]
    },
    {
      name: 'Other Skills',
      icon: 'fa-star',
      skills: [
        { name: 'API Development', icon: 'fa-plug', level: 'Advanced' },
        { name: 'Data Structures & Algorithms', icon: 'fa-project-diagram', level: 'Advanced' }
      ]
    }
  ];
}
