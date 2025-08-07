import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface LotteryDraw {
  date: string;
  numbers: number[];
}

interface NumberFrequency {
  number: number;
  frequency: number;
  dates: string[];
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() lotteryType: string | null = null;
  @Input() startDate: string = '';

  // Chart data properties
  fiveNumbersData: NumberFrequency[] = [];
  jackpotNumbersData: NumberFrequency[] = [];
  unusedFiveNumbers: number[] = [];
  unusedJackpotNumbers: number[] = [];
  
  // Loading state
  isLoading: boolean = false;
  
  // Chart dimensions
  chartWidth = 1400; // Much larger width
  chartHeight = 800; // Much taller height
  margin = { top: 20, right: 80, bottom: 80, left: 80 }; // Increased margins for larger labels
  
  // Tooltip properties
  tooltip = { visible: false, x: 0, y: 0, number: 0, frequency: 0, date: '' };

  ngOnInit(): void {
    this.loadChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'] || changes['lotteryType']) {
      this.loadChartData();
    }
  }

  private async loadChartData(): Promise<void> {
    if (!this.startDate || !this.lotteryType) return;
    
    this.isLoading = true;
    
    try {
      // Load lottery data (you'll need to add powerball.json to your assets folder)
      const response = await fetch('/assets/powerball.json');
      const allData: LotteryDraw[] = await response.json();
      
      // Filter data by date range
      const filteredData = this.filterDataByDateRange(allData);
      
      // Process data for charts
      this.processFiveNumbersData(filteredData);
      this.processJackpotNumbersData(filteredData);
      
      // Render charts
      setTimeout(() => {
        this.renderFiveNumbersChart();
        this.renderJackpotNumbersChart();
      }, 100);
      
    } catch (error) {
      console.error('Error loading lottery data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private filterDataByDateRange(data: LotteryDraw[]): LotteryDraw[] {
    const startDate = new Date(this.startDate);
    const today = new Date();
    
    return data.filter(draw => {
      const drawDate = new Date(draw.date);
      return drawDate >= startDate && drawDate <= today;
    });
  }

  private processFiveNumbersData(data: LotteryDraw[]): void {
    const frequencyMap = new Map<number, { frequency: number; dates: string[] }>();
    
    // Process first 5 numbers from each draw
    data.forEach(draw => {
      const fiveNumbers = draw.numbers.slice(0, 5);
      fiveNumbers.forEach(number => {
        if (!frequencyMap.has(number)) {
          frequencyMap.set(number, { frequency: 0, dates: [] });
        }
        const entry = frequencyMap.get(number)!;
        entry.frequency++;
        entry.dates.push(draw.date);
      });
    });

    // Convert to array and sort by frequency (highest first)
    this.fiveNumbersData = Array.from(frequencyMap.entries())
      .map(([number, data]) => ({
        number,
        frequency: data.frequency,
        dates: data.dates
      }))
      .sort((a, b) => b.frequency - a.frequency);

    // Find unused numbers (1-69)
    const usedNumbers = new Set(this.fiveNumbersData.map(d => d.number));
    this.unusedFiveNumbers = [];
    for (let i = 1; i <= 69; i++) {
      if (!usedNumbers.has(i)) {
        this.unusedFiveNumbers.push(i);
      }
    }
  }

  private processJackpotNumbersData(data: LotteryDraw[]): void {
    const frequencyMap = new Map<number, { frequency: number; dates: string[] }>();
    
    // Process last number (Powerball) from each draw
    data.forEach(draw => {
      const powerball = draw.numbers[draw.numbers.length - 1];
      if (!frequencyMap.has(powerball)) {
        frequencyMap.set(powerball, { frequency: 0, dates: [] });
      }
      const entry = frequencyMap.get(powerball)!;
      entry.frequency++;
      entry.dates.push(draw.date);
    });

    // Convert to array and sort by frequency (highest first)
    this.jackpotNumbersData = Array.from(frequencyMap.entries())
      .map(([number, data]) => ({
        number,
        frequency: data.frequency,
        dates: data.dates
      }))
      .sort((a, b) => b.frequency - a.frequency);

    // Find unused numbers (1-26)
    const usedNumbers = new Set(this.jackpotNumbersData.map(d => d.number));
    this.unusedJackpotNumbers = [];
    for (let i = 1; i <= 26; i++) {
      if (!usedNumbers.has(i)) {
        this.unusedJackpotNumbers.push(i);
      }
    }
  }

  private renderFiveNumbersChart(): void {
    const canvas = document.getElementById('fiveNumbersCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    this.renderChart(ctx, this.fiveNumbersData, 'Five Numbers');
    this.addCanvasEventListeners(canvas, this.fiveNumbersData);
  }

  private renderJackpotNumbersChart(): void {
    const canvas = document.getElementById('jackpotNumbersCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    this.renderChart(ctx, this.jackpotNumbersData, 'Powerball Numbers');
    this.addCanvasEventListeners(canvas, this.jackpotNumbersData);
  }

  private renderChart(ctx: CanvasRenderingContext2D, data: NumberFrequency[], title: string): void {
    const canvas = ctx.canvas;
    canvas.width = this.chartWidth;
    canvas.height = this.chartHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (data.length === 0) return;

    // Calculate date range
    const startDate = new Date(this.startDate);
    const today = new Date();
    const totalDays = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    // Chart area
    const chartArea = {
      x: this.margin.left,
      y: this.margin.top,
      width: this.chartWidth - this.margin.left - this.margin.right,
      height: this.chartHeight - this.margin.top - this.margin.bottom
    };

    // Draw background
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(chartArea.x, chartArea.y, chartArea.width, chartArea.height);

    // Draw horizontal grid lines and labels
    const lineHeight = chartArea.height / data.length;
    
    data.forEach((item, index) => {
      const y = chartArea.y + (index * lineHeight) + (lineHeight / 2);
      
      // Draw horizontal line
      ctx.strokeStyle = '#d3d3d3';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(chartArea.x, y);
      ctx.lineTo(chartArea.x + chartArea.width, y);
      ctx.stroke();

      // Left Y-axis label (number value)
      ctx.fillStyle = '#333';
      ctx.font = '16px Arial'; // Larger font
      ctx.textAlign = 'right';
      ctx.fillText(item.number.toString(), chartArea.x - 15, y + 6);

      // Right Y-axis label (frequency)
      ctx.textAlign = 'left';
      ctx.fillText(item.frequency.toString(), chartArea.x + chartArea.width + 15, y + 6);

      // Draw dots for each occurrence
      item.dates.forEach((dateStr, dateIndex) => {
        const drawDate = new Date(dateStr);
        const daysDiff = Math.ceil((drawDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const x = chartArea.x + ((totalDays - daysDiff) / totalDays) * chartArea.width;
        
        // Find the most recent occurrence (latest date)
        const isLatestOccurrence = dateStr === item.dates.reduce((latest, current) => 
          new Date(current) > new Date(latest) ? current : latest
        );
        
        // Set color - golden for most recent, blue for others
        ctx.fillStyle = isLatestOccurrence ? '#FFD700' : '#007bff';
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI); // Larger dots
        ctx.fill();
        
        // Add stroke for golden dots to make them more visible
        if (isLatestOccurrence) {
          ctx.strokeStyle = '#DAA520';
          ctx.lineWidth = 2; // Thicker stroke
          ctx.stroke();
        }
      });
    });

    // Draw chart border
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(chartArea.x, chartArea.y, chartArea.width, chartArea.height);

    // Draw X-axis labels
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial'; // Larger font for x-axis
    ctx.textAlign = 'center';
    
    // Start date label
    ctx.fillText('0', chartArea.x, chartArea.y + chartArea.height + 30);
    
    // Add intermediate labels (25%, 50%, 75%)
    const quarterPoint = chartArea.x + (chartArea.width * 0.25);
    const halfPoint = chartArea.x + (chartArea.width * 0.5);
    const threeQuarterPoint = chartArea.x + (chartArea.width * 0.75);
    
    ctx.fillText(Math.round(totalDays * 0.25).toString(), quarterPoint, chartArea.y + chartArea.height + 30);
    ctx.fillText(Math.round(totalDays * 0.5).toString(), halfPoint, chartArea.y + chartArea.height + 30);
    ctx.fillText(Math.round(totalDays * 0.75).toString(), threeQuarterPoint, chartArea.y + chartArea.height + 30);
    
    // Today label
    ctx.fillText(totalDays.toString(), chartArea.x + chartArea.width, chartArea.y + chartArea.height + 30);
    
    // Draw vertical grid lines for the intermediate points
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    [quarterPoint, halfPoint, threeQuarterPoint].forEach(x => {
      ctx.beginPath();
      ctx.moveTo(x, chartArea.y);
      ctx.lineTo(x, chartArea.y + chartArea.height);
      ctx.stroke();
    });
    
    ctx.setLineDash([]); // Reset line dash
    
    // X-axis title
    ctx.font = '16px Arial'; // Larger font for title
    ctx.fillText('Days from Start Date', chartArea.x + chartArea.width / 2, chartArea.y + chartArea.height + 60);

    // Y-axis titles
    ctx.save();
    ctx.translate(25, chartArea.y + chartArea.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.font = '16px Arial'; // Larger font for y-axis title
    ctx.fillText('Number', 0, 0);
    ctx.restore();

    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(chartArea.x + chartArea.width + 60, chartArea.y + chartArea.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.font = '16px Arial'; // Larger font for y-axis title
    ctx.fillText('Frequency', 0, 0);
    ctx.restore();
    
    // Draw tooltip if visible
    if (this.tooltip.visible) {
      this.drawTooltip(ctx);
    }
  }

  private addCanvasEventListeners(canvas: HTMLCanvasElement, data: NumberFrequency[]): void {
    canvas.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      this.handleMouseMove(canvas, mouseX, mouseY, data);
    });
    
    canvas.addEventListener('mouseleave', () => {
      this.tooltip.visible = false;
      this.redrawChart(canvas, data);
    });
  }

  private handleMouseMove(canvas: HTMLCanvasElement, mouseX: number, mouseY: number, data: NumberFrequency[]): void {
    const startDate = new Date(this.startDate);
    const today = new Date();
    const totalDays = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const chartArea = {
      x: this.margin.left,
      y: this.margin.top,
      width: this.chartWidth - this.margin.left - this.margin.right,
      height: this.chartHeight - this.margin.top - this.margin.bottom
    };
    
    const lineHeight = chartArea.height / data.length;
    let foundPoint = false;
    
    data.forEach((item, index) => {
      const y = chartArea.y + (index * lineHeight) + (lineHeight / 2);
      
      item.dates.forEach(dateStr => {
        const drawDate = new Date(dateStr);
        const daysDiff = Math.ceil((drawDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const x = chartArea.x + ((totalDays - daysDiff) / totalDays) * chartArea.width;
        
        // Check if mouse is near this point (within 6 pixels for larger dots)
        const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));
        if (distance <= 6) {
          this.tooltip = {
            visible: true,
            x: mouseX,
            y: mouseY,
            number: item.number,
            frequency: item.frequency,
            date: dateStr
          };
          foundPoint = true;
        }
      });
    });
    
    if (!foundPoint) {
      this.tooltip.visible = false;
    }
    
    this.redrawChart(canvas, data);
  }

  private redrawChart(canvas: HTMLCanvasElement, data: NumberFrequency[]): void {
    const ctx = canvas.getContext('2d')!;
    this.renderChart(ctx, data, '');
  }

  private drawTooltip(ctx: CanvasRenderingContext2D): void {
    const tooltipWidth = 140;
    const tooltipHeight = 60;
    let tooltipX = this.tooltip.x + 10;
    let tooltipY = this.tooltip.y - 10;
    
    // Adjust tooltip position if it goes off canvas
    if (tooltipX + tooltipWidth > this.chartWidth) {
      tooltipX = this.tooltip.x - tooltipWidth - 10;
    }
    if (tooltipY - tooltipHeight < 0) {
      tooltipY = this.tooltip.y + 20;
    }
    
    // Draw tooltip background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(tooltipX, tooltipY - tooltipHeight, tooltipWidth, tooltipHeight);
    
    // Draw tooltip text
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Number: ${this.tooltip.number}`, tooltipX + 8, tooltipY - 40);
    ctx.fillText(`Frequency: ${this.tooltip.frequency}`, tooltipX + 8, tooltipY - 25);
    ctx.fillText(`Date: ${this.tooltip.date}`, tooltipX + 8, tooltipY - 10);
  }
  

  private getDaysDifference(date1: string, date2: string): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  }
}