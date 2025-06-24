import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-surprise',
  templateUrl: './surprise.component.html',
  styleUrls: ['./surprise.component.scss']
})
export class SurpriseComponent {
  earthquakeActive = false;
  laserActive = false;
  laserDot: HTMLDivElement | null = null;
  dancePartyActive = false;
  danceInterval: any;
  danceTimeout: any;

  snakeVisible = false;
  direction = 'RIGHT';
  snake: { x: number; y: number }[] = [];
  food: { x: number; y: number } = { x: 0, y: 0 };
  intervalId: any;

  @ViewChild('snakeCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  leaveSite() {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  }

  toggleDanceParty() {
    if (this.dancePartyActive) {
      this.stopDanceParty();
      return;
    }

    this.dancePartyActive = true;

    this.danceInterval = setInterval(() => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
    }, 150);

    this.danceTimeout = setTimeout(() => {
      this.stopDanceParty();
    }, 3000);
  }

  stopDanceParty() {
    clearInterval(this.danceInterval);
    clearTimeout(this.danceTimeout);
    document.body.style.backgroundColor = '';
    this.dancePartyActive = false;
  }

  toggleEarthquake() {
    this.earthquakeActive = !this.earthquakeActive;
    const panel = document.querySelector('.control-panel');
    if (panel) {
      if (this.earthquakeActive) {
        panel.classList.add('earthquake');
        setTimeout(() => {
          panel.classList.remove('earthquake');
          this.earthquakeActive = false;
        }, 2000);
      } else {
        panel.classList.remove('earthquake');
      }
    }
  }

  changeTextColor(event: Event) {
    const input = event.target as HTMLInputElement;
    const color = input.value;
    document.documentElement.style.setProperty('--text-color', color);
  }

  setFavicon(faviconPath: string) {
    let link = document.getElementById('dynamic-favicon') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.id = 'dynamic-favicon';
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = `${faviconPath}?v=${new Date().getTime()}`;
  }

  toggleLaser() {
    this.laserActive = !this.laserActive;
    if (this.laserDot) {
      this.laserDot.remove();
      this.laserDot = null;
    }
    document.removeEventListener('mousemove', this.trackMouse);

    if (this.laserActive) {
      this.laserDot = document.createElement('div');
      this.laserDot.classList.add('laser-dot');
      document.body.appendChild(this.laserDot);
      document.addEventListener('mousemove', this.trackMouse);
    }
  }

  trackMouse = (e: MouseEvent) => {
    if (this.laserDot) {
      this.laserDot.style.left = `${e.clientX}px`;
      this.laserDot.style.top = `${e.clientY}px`;
    }
  };

  closeSnake() {
    this.snakeVisible = false;
    clearInterval(this.intervalId);
  }

  setSnakeDirection(dir: string) {
    if (
      (dir === 'UP' && this.direction !== 'DOWN') ||
      (dir === 'DOWN' && this.direction !== 'UP') ||
      (dir === 'LEFT' && this.direction !== 'RIGHT') ||
      (dir === 'RIGHT' && this.direction !== 'LEFT')
    ) {
      this.direction = dir;
    }
  }

  startSnake() {
    this.snake = [{ x: 100, y: 100 }];
    this.direction = 'RIGHT';
    this.food = {
      x: Math.floor(Math.random() * 20) * 10,
      y: Math.floor(Math.random() * 20) * 10
    };

    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;
    const box = 10;

    this.intervalId = setInterval(() => {
      ctx.clearRect(0, 0, 200, 200);
      for (let i = 0; i < this.snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'lime' : 'green';
        ctx.fillRect(this.snake[i].x, this.snake[i].y, box, box);
      }

      ctx.fillStyle = 'red';
      ctx.fillRect(this.food.x, this.food.y, box, box);

      let headX = this.snake[0].x;
      let headY = this.snake[0].y;

      if (this.direction === 'UP') headY -= box;
      if (this.direction === 'DOWN') headY += box;
      if (this.direction === 'LEFT') headX -= box;
      if (this.direction === 'RIGHT') headX += box;

      if (headX === this.food.x && headY === this.food.y) {
        this.food = {
          x: Math.floor(Math.random() * 20) * 10,
          y: Math.floor(Math.random() * 20) * 10
        };
      } else {
        this.snake.pop();
      }

      const newHead = { x: headX, y: headY };

      if (
        headX < 0 || headY < 0 || headX >= 200 || headY >= 200 ||
        this.snake.some(seg => seg.x === headX && seg.y === headY)
      ) {
        clearInterval(this.intervalId);
        alert('Game Over!');
        this.snakeVisible = false;
        return;
      }

      this.snake.unshift(newHead);
    }, 200);
  }
}
