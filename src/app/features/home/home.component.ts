// src/app/features/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ProjectFilterComponent } from './components/project-filter/project-filter.component';
import { CsProjectsComponent } from './components/cs-projects/cs-projects.component';
import { MarketingProjectsComponent } from './components/marketing-projects/marketing-projects.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProjectFilterComponent,
    CsProjectsComponent,
    MarketingProjectsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('projectsAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class HomeComponent {
  activeProjectType: 'cs' | 'marketing' = 'cs';

  switchProjects(type: 'cs' | 'marketing'): void {
    this.activeProjectType = type;
  }
}