// lot.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './charts/chart.component';
import { PowerballApiService, PowerballEntry, MegaMillionEntry } from './powerball.api';

@Component({
  selector: 'app-lot',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartComponent],
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.scss']
})
export class LotComponent {
  selectedLottery: string | null = null;
  startDate: string = '';
  today: string = new Date().toISOString().split('T')[0];
  formValid: boolean = false;
  chartVisible: boolean = false;

  powerballEntry: PowerballEntry = {
    drawDate: this.today,
    number1: 0,
    number2: 0,
    number3: 0,
    number4: 0,
    number5: 0,
    powerball: 0
  };

  megaMillionEntry: MegaMillionEntry = {
    drawDate: this.today,
    number1: 0,
    number2: 0,
    number3: 0,
    number4: 0,
    number5: 0,
    megaBall: 0
  };

  constructor(private powerballApi: PowerballApiService) {}

  selectLottery(type: string): void {
    this.selectedLottery = type;
    this.checkFormValid();
  }

  checkFormValid(): void {
    this.formValid = !!(this.selectedLottery && this.startDate);
  }

  submit(): void {
    this.chartVisible = true;
  }

  submitPowerballNumbers(): void {
    this.powerballApi.submitEntry(this.powerballEntry, 'Powerball').subscribe(success => {
      if (success) {
        console.log('Powerball entry submitted successfully');
        this.resetPowerballForm();
      } else {
        console.warn('Powerball submission failed');
      }
    });
  }

  submitMegaMillionNumbers(): void {
    this.powerballApi.submitEntry(this.megaMillionEntry, 'MegaMillions').subscribe(success => {
      if (success) {
        console.log('Mega Millions entry submitted successfully');
        this.resetMegaMillionForm();
      } else {
        console.warn('Mega Millions submission failed');
      }
    });
  }

  resetPowerballForm(): void {
    this.powerballEntry = {
      drawDate: this.today,
      number1: 0,
      number2: 0,
      number3: 0,
      number4: 0,
      number5: 0,
      powerball: 0
    };
  }

  resetMegaMillionForm(): void {
    this.megaMillionEntry = {
      drawDate: this.today,
      number1: 0,
      number2: 0,
      number3: 0,
      number4: 0,
      number5: 0,
      megaBall: 0
    };
  }

  loadHistoricalData(): void {
    if (this.selectedLottery) {
      const gameType = this.selectedLottery === 'powerball' ? 'Powerball' : 'MegaMillions';
      this.powerballApi.getEntries(gameType).subscribe(data => {
        console.log('Historical data loaded:', data);
        this.chartVisible = true;
      });
    }
  }
}
