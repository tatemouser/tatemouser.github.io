import { Component } from '@angular/core';

@Component({
  selector: 'app-surprise',
  templateUrl: './surprise.component.html',
  styleUrls: ['./surprise.component.scss']
})


export class SurpriseComponent {
    
    leaveSite() {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
    changeTextColor(event: Event) {
        const input = event.target as HTMLInputElement;
        const color = input.value;
        document.documentElement.style.setProperty('--text-color', color);
    }
}


