import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class HomePage {
  dashboard = {
    acTemp: 16,
    radioVolume: 0,
    headlight: 0,
    seatHeating: 0
  };

  aceImg: string | ArrayBuffer | null = 'assets/default-avatar.png'; // default hero image

  ranges = {
    acTemp: { min: 16, max: 30 },
    radioVolume: { min: 0, max: 100 },
    headlight: { min: 0, max: 100 },
    seatHeating: { min: 0, max: 5 }
  };

  updateValue(key: keyof typeof this.dashboard, value: number | undefined) {
    if (value === undefined) return;
    const { min, max } = this.ranges[key];
    if (value < min) value = min;
    if (value > max) value = max;
    this.dashboard[key] = value;
  }

  getSliderColor(key: keyof typeof this.dashboard): string {
    const val = this.dashboard[key];
    switch (key) {
      case 'acTemp':
        return `linear-gradient(90deg, #00c6ff ${(val-16)/(30-16)*100}%, rgba(255,255,255,0.2) 0%)`;
      case 'radioVolume':
        return `linear-gradient(90deg, #00ff85 ${(val/100)*100}%, rgba(255,255,255,0.2) 0%)`;
      case 'headlight':
        return `linear-gradient(90deg, #ffe259 ${(val/100)*100}%, rgba(255,255,255,0.2) 0%)`;
      case 'seatHeating':
        return `linear-gradient(90deg, #ff512f ${(val/5)*100}%, rgba(255,255,255,0.2) 0%)`;
      default:
        return '';
    }
  }

  getTextColor(key: keyof typeof this.dashboard): string {
    const val = this.dashboard[key];
    switch (key) {
      case 'acTemp': return `rgba(255, 255, 255, ${0.5 + ((val-16)/14)*0.5})`;
      case 'radioVolume': return `rgba(255, 255, 255, ${0.5 + (val/100)*0.5})`;
      case 'headlight': return `rgba(255, 255, 255, ${0.5 + (val/100)*0.5})`;
      case 'seatHeating': return `rgba(255, 255, 255, ${0.5 + (val/5)*0.5})`;
      default: return '#fff';
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.aceImg = reader.result;
      reader.readAsDataURL(file);
    }
  }
}
