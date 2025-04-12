// src/app/features/home/components/cs-projects/cs-projects.component.ts
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
  selector: 'app-cs-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './cs-projects.component.html',
  styleUrls: ['./cs-projects.component.scss']
})
export class CsProjectsComponent {
  projects: Project[] = [
    {
      id: 1,
      title: 'Project Management App',
      description: 'A full-stack application for project management with real-time updates.',
      imageUrl: 'assets/images/project1.jpg',
      technologies: ['Angular', 'Node.js', 'MongoDB'],
      link: 'https://github.com/example/project1'
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      description: 'A responsive e-commerce platform with payment integration.',
      imageUrl: 'assets/images/project2.jpg',
      technologies: ['React', 'Express', 'PostgreSQL'],
      link: 'https://github.com/example/project2'
    },
    // Add more projects as needed
  ];
}