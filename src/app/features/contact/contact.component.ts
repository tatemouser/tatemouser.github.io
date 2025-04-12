import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  success = false;
  submitting = false;
  webFormsAccessKey: string;
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
    
    // Get Web3Forms access key from environment variables
    this.webFormsAccessKey = environment.web3FormsAccessKey;
  }
  
  ngOnInit(): void {
    // Initialization code if needed
  }
  
  onSubmit(): void {
    this.submitted = true;
    
    if (this.contactForm.valid) {
      this.submitting = true;
      
      const formData = {
        ...this.contactForm.value,
        access_key: this.webFormsAccessKey
      };
      
      this.http.post('https://api.web3forms.com/submit', formData)
        .subscribe({
          next: (response) => {
            console.log('Form submitted successfully', response);
            this.success = true;
            this.contactForm.reset();
            this.submitted = false;
            this.submitting = false;
            
            // Reset success message after 5 seconds
            setTimeout(() => {
              this.success = false;
            }, 5000);
          },
          error: (error) => {
            console.error('Error submitting form:', error);
            this.submitting = false;
            alert('An error occurred while submitting the form. Please try again later.');
          }
        });
    }
  }
}
