import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loginEvent: EventEmitter<void> = new EventEmitter<void>();
  registerEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  triggerLogInEvent(): void {
    this.loginEvent.emit();
  }

  triggerRegisterEvent(): void {
    this.registerEvent.emit();
  }
}
