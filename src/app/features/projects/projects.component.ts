import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../shared/components/project-card.component/project-card.component';
import { GithubService } from '../../core/services/github.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.githubService.getRepos('AKASH-kce').subscribe((repos: any[]) => {
      this.projects = repos.map(repo => ({
        title: repo.name,
        description: repo.description,
        image: repo.owner?.avatar_url || 'assets/default-project.png',
        codeUrl: repo.html_url,
        demoUrl: repo.homepage || '',
        tags: repo.topics && repo.topics.length ? repo.topics : (repo.language ? [repo.language] : []),
        icon: 'fa-github'
      }));
    });
  }
}