// src/app/features/home/home.component.ts
import { AfterViewInit, Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ProjectFilterComponent } from './components/project-filter/project-filter.component';
import { CsProjectsComponent } from './components/cs-projects/cs-projects.component';
import { NetProjectsComponent } from './components/net-projects/net-projects.component';
import { OpenProjectsComponent } from './components/open-projects/open-projects.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProjectFilterComponent,
    CsProjectsComponent,
    NetProjectsComponent,
    OpenProjectsComponent
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
export class HomeComponent implements AfterViewInit {
  @ViewChild('typewriter', { static: true }) typewriterRef!: ElementRef;
  @ViewChild('imageButton', { static: true }) imageButtonRef!: ElementRef;
  @ViewChild('introText', { static: true }) introTextRef!: ElementRef;
  activeProjectType: 'cs' | 'net' | 'open' = 'cs';

  constructor(private renderer: Renderer2) {}

  switchProjects(type: 'cs' | 'net' | 'open'): void {
    this.activeProjectType = type;
  }

  ngAfterViewInit(): void {
    const text = 'Hello World!';
    const element = this.typewriterRef.nativeElement;
    let i = 0;

    // Initial delay before typing
    setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);

          // Simulate button press animation after typing
          setTimeout(() => {
            this.renderer.addClass(this.imageButtonRef.nativeElement, 'pressed');
            this.renderer.addClass(this.introTextRef.nativeElement, 'fade-in-p');

            setTimeout(() => {
              this.renderer.removeClass(this.imageButtonRef.nativeElement, 'pressed');
            }, 200);
          }, 500);
        }
      }, 100);
    }, 1500); // initial delay before typing
  }
}