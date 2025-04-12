// src/app/features/home/components/project-filter/project-filter.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent {
  @Input() activeType: 'cs' | 'marketing' = 'cs';
  @Output() typeChange = new EventEmitter<'cs' | 'marketing'>();

  switchType(type: 'cs' | 'marketing'): void {
    if (type !== this.activeType) {
      this.typeChange.emit(type);
    }
  }
}