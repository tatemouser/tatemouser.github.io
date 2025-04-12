// src/app/features/home/components/marketing-projects/marketing-projects.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../../../shared/components/project-card/project-card.component';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  link?: string;
}

@Component({
  selector: 'app-marketing-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './marketing-projects.component.html',
  styleUrls: ['./marketing-projects.component.scss']
})
export class MarketingProjectsComponent {
  projects: Project[] = [
    {
      id: 1,
      title: 'Coming Soon',
      description: 'Under Construction',
      imageUrl: 'assets/images/icons/TEMPIMAGE.png',
      technologies: [],
      link: 'https://example.com/marketing1'
    },
    {
      id: 1,
      title: 'Coming Soon',
      description: 'Under Construction',
      imageUrl: 'assets/images/icons/TEMPIMAGE.png',
      technologies: [],
      link: 'https://example.com/marketing1'
    },
    {
      id: 1,
      title: 'Coming Soon',
      description: 'Under Construction',
      imageUrl: 'assets/images/icons/TEMPIMAGE.png',
      technologies: [],
      link: 'https://example.com/marketing1'
    }
  ];
}