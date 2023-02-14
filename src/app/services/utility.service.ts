import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor() { }

  get randomString(): string {
    return Math.random().toString(36).substring(2);
  }
}