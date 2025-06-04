// src/app/features/home/components/net-projects/net-projects.component.ts
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
  selector: 'app-net-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './net-projects.component.html',
  styleUrls: ['./net-projects.component.scss']
})
export class NetProjectsComponent {
  projects: Project[] = [
    {
      id: 1,
      title: 'Portfolio Content Management System',
      description: 'Full-stack .NET Web API with secure CRUD functionality to manage portfolio content live from an Angular frontend. Features JWT authentication, admin-only access, SQL Server integration, and  Azure deployment for dynamic project updates without editing code.',
      imageUrl: 'assets/images/projects/cms.png',
      technologies: ['.NET', 'Web API', 'Entity Framework', 'Azure', 'JWT', 'SQL Server', 'C#', 'Angular', 'REST', 'SQL','Authentication','xUnit'],
      link: 'https://github.com/tatemouser/PortfolioCMS-API',
    },
    {
      id: 2,
      title: 'Dummy Data Generator',
      description: 'Create mock data using a console app or Web API. Supports CSV/JSON output, test automation, live preview, and over 35 unit, validation, and API tests with CI.',
      imageUrl: 'assets/images/projects/generator.png',
      technologies: ['.NET', 'Web API', 'xUnit', 'GitHub Actions', 'Console App', 'CSV/JSON', 'Validation', 'Testing','C#', 'CLI'],
      link: 'https://github.com/tatemouser/DummyDataGenerator-ConsoleAppp',
    },
    {
      id: 3,
      title: 'Coming Soon',
      description: 'Under Construction',
      imageUrl: 'assets/images/icons/TEMPIMAGE.png',
      technologies: [],
      link: 'https://github.com/tatemouser'
    },
    {
      id: 4,
      title: 'Coming Soon',
      description: 'Under Construction',
      imageUrl: 'assets/images/icons/TEMPIMAGE.png',
      technologies: [],
      link: 'https://github.com/tatemouser'
    }
  ];
}