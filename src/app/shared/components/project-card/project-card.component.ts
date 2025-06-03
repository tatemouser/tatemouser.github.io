// src/app/shared/components/project-card/project-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  link?: string;
  customButtonClass?: string;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project!: Project;

  logoMap: { [tech: string]: string } = {
    'React': 'https://cdn.simpleicons.org/react/61DAFB',
    'Node.js': 'https://cdn.simpleicons.org/nodedotjs/339933',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'MySQL': 'https://cdn.simpleicons.org/mysql/4479A1',
    'Flask': 'https://cdn.simpleicons.org/flask/000000',
    'HTML': 'https://cdn.simpleicons.org/html5/E34F26',
    'CSS': 'https://cdn.simpleicons.org/css3/1572B6',
    'JavaScript': 'https://cdn.simpleicons.org/javascript/F7DF1E',
    'MATLAB': 'https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png',
    'OpenCV': 'https://cdn.simpleicons.org/opencv/5C3EE8',
    'SQLite': 'https://cdn.simpleicons.org/sqlite/003B57',
    'Firebase': 'https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png',
    'Angular': 'https://cdn.simpleicons.org/angular/DD0031',
    'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  };

  get displayTechnologies(): string[] {
    return this.project.technologies.filter(tech => !(tech in this.logoMap));
  }

  get logoTechnologies(): string[] {
    return this.project.technologies.filter(tech => tech in this.logoMap && this.logoMap[tech]);
  }
}