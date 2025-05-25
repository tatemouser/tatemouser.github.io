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
  @Input() activeType: 'cs' | 'net' | 'open' = 'cs'; 
  @Output() typeChange = new EventEmitter<'cs' | 'net' | 'open'>(); 

  switchType(type: 'cs' | 'net' | 'open'): void { 
    if (type !== this.activeType) {
      this.typeChange.emit(type);
    }
  }
}