// powerball.api.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map} from 'rxjs';

export interface PowerballEntry {
  drawDate: string;
  number1: number;
  number2: number;
  number3: number;
  number4: number;
  number5: number;
  powerball: number;
}

export interface MegaMillionEntry {
  drawDate: string;
  number1: number;
  number2: number;
  number3: number;
  number4: number;
  number5: number;
  megaBall: number;
}

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxX9bInfwEV-xvrOK5Usww5i9jVpZkOVvWH5sFwMAzjiLIWZrGz7BZ1osRXdpQLcTmAhA/exec';

@Injectable({ providedIn: 'root' })
export class PowerballApiService {
  constructor(private http: HttpClient) {}

  submitEntry(entry: PowerballEntry | MegaMillionEntry, type: 'Powerball' | 'MegaMillions'): Observable<boolean> {
    const params: any = {
      submit: 'true',
      gameType: type,
      date: entry.drawDate,
      number1: entry.number1,
      number2: entry.number2,
      number3: entry.number3,
      number4: entry.number4,
      number5: entry.number5
    };

    if (type === 'Powerball') {
      params.powerball = (entry as PowerballEntry).powerball;
    } else {
      params.powerball = (entry as MegaMillionEntry).megaBall; // Reuses 'powerball' param name
    }

    const queryString = new URLSearchParams(params).toString();
    const url = `${GOOGLE_APPS_SCRIPT_URL}?${queryString}`;

    return this.http.get(url, { responseType: 'text' }).pipe(
      map(response => {
        console.log('Response from Google Script:', response);
        return response === 'Success';
      }),
      catchError(err => {
        console.error(`Error submitting ${type} entry:`, err);
        return of(false);
      })
    );
  }

  getEntries(type: 'Powerball' | 'MegaMillions'): Observable<any[]> {
    const url = `https://script.google.com/macros/s/AKfycbxX9bInfwEV-xvrOK5Usww5i9jVpZkOVvWH5sFwMAzjiLIWZrGz7BZ1osRXdpQLcTmAhA/exec?gameType=${type}`;
    return this.http.get<any[]>(url).pipe(
      catchError(err => {
        console.error(`Error retrieving ${type} entries:`, err);
        return of([]);
      })
    );
  }
}
