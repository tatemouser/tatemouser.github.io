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
      title: 'Swipe Shopping',
      description: 'Shop by swiping! Users swipe to add or skip items, filter cart contents, and check out. Built with React, Node.js, MySQL, and JWT auth.',
      imageUrl: 'assets/images/projects/swipe.png',
      technologies: ['React', 'Node.js', 'MySQL'],
      link: 'https://github.com/example/swipe-shopping'
    },
    {
      id: 2,
      title: 'SQLite Library System',
      description: 'Simple library management system with patron/librarian roles. Includes filtering, user management, and SQL protection.',
      imageUrl: 'assets/images/projects/library.png',
      technologies: ['Flask', 'SQLite', 'AJAX'],
      link: 'https://github.com/example/library-system'
    },
    {
      id: 3,
      title: 'AutoCorrect App',
      description: 'Java program predicts words from a 10-button input using bigram language model. Displays all possible combinations and scores.',
      imageUrl: 'assets/images/projects/autocorrect.png',
      technologies: ['Java', 'CSV', 'Swing'],
      link: 'https://github.com/example/autocorrect'
    },
    {
      id: 4,
      title: 'Sentiment Analysis',
      description: 'Analyzes text from a URL and shows percentages for 10 emotions using a training dataset and prefix tree structure.',
      imageUrl: 'assets/images/projects/sentiment.png',
      technologies: ['Java', 'CSV', 'SWT'],
      link: 'https://github.com/example/sentiment-analysis'
    },
    {
      id: 5,
      title: 'Order Fulfillment Tracker',
      description: 'Java app locates items on a shelf using scraped Google images, OpenCV object detection, and SURF descriptor matching.',
      imageUrl: 'assets/images/projects/vision.png',
      technologies: ['Java', 'OpenCV', 'JSoup'],
      link: 'https://github.com/example/order-fulfillment'
    },
    {
      id: 6,
      title: 'Lawn Business Website',
      description: 'Responsive site with before/after slider, service area map, and modular layout. Designed for reuse and clarity.',
      imageUrl: 'assets/images/projects/lawn.png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://github.com/example/lawn-site'
    },
    {
      id: 7,
      title: 'Pickleball Site',
      description: 'Resource site for pickleball players with a live court positioning game and trivia overlay. Fully responsive.',
      imageUrl: 'assets/images/projects/pickleball.png',
      technologies: ['HTML', 'JavaScript', 'CSS'],
      link: 'https://github.com/example/pickleball-site'
    },
    {
      id: 8,
      title: 'Food Business Site',
      description: 'Business landing page with live QR code, service map, and interactive sliding header. Optimized for all screens.',
      imageUrl: 'assets/images/projects/taco.png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://github.com/example/food-site'
    },
    {
      id: 9,
      title: 'MATLAB Game',
      description: 'A custom strategy game combining tic-tac-toe and piece movement after 6 turns. Built in MATLAB with win visuals.',
      imageUrl: 'assets/images/projects/matlab.png',
      technologies: ['MATLAB'],
      link: 'https://github.com/example/matlab-game'
    }
  ];
}