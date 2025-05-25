// src/app/features/home/components/open-projects/open-projects.component.ts
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
  selector: 'app-open-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './open-projects.component.html',
  styleUrls: ['./open-projects.component.scss']
})
export class OpenProjectsComponent {
  projects: Project[] = [
    {
      id: 1,
      title: 'Coming Soon',
      description: 'Under Construction',
      imageUrl: 'assets/images/icons/TEMPIMAGE.png',
      technologies: [],
      link: 'https://github.com/tatemouser'
    },
    {
      id: 2,
      title: 'Coming Soon',
      description: 'Under Construction',
      imageUrl: 'assets/images/icons/TEMPIMAGE.png',
      technologies: [],
      link: 'https://github.com/tatemouser'
    },
    {
      id: 3,
      title: 'Coming Soon',
      description: 'Under Construction',
      imageUrl: 'assets/images/icons/TEMPIMAGE.png',
      technologies: [],
      link: 'https://github.com/tatemouser'
    }
  ];
}