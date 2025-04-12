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
      title: 'Brand Redesign Campaign',
      description: 'Complete rebranding strategy for a tech startup.',
      imageUrl: 'assets/images/marketing1.jpg',
      technologies: ['Branding', 'Social Media', 'Content Strategy'],
      link: 'https://example.com/marketing1'
    },
    {
      id: 2,
      title: 'Product Launch Campaign',
      description: 'Successful product launch strategy increasing sales by 200%.',
      imageUrl: 'assets/images/marketing2.jpg',
      technologies: ['Email Marketing', 'PPC', 'Analytics'],
      link: 'https://example.com/marketing2'
    },
    // Add more projects as needed
  ];
}