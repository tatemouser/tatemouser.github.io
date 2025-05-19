import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  success = false;
  
  ngOnInit(): void {
    // Load Web3Forms CAPTCHA script
    this.loadCaptchaScript();
    
    // Create a simple success handler
    window.addEventListener('DOMContentLoaded', () => {
      const form = document.querySelector('.contact-form-element') as HTMLFormElement;
      
      if (form) {
        // Add a custom submit handler
        form.addEventListener('submit', (e) => {
          // Just update the UI to show the form is being submitted
          const submitButton = document.querySelector('.submit-button') as HTMLButtonElement;
          if (submitButton) {
            submitButton.innerText = 'Sending...';
            submitButton.disabled = true;
          }
          
          // Allow form submission to continue
          return true;
        });
      }
    });
  }
  
  /* Load external CAPTCHA client-side script */
  loadCaptchaScript(): void {
    const script = document.createElement('script');
    script.src = 'https://web3forms.com/client/script.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}