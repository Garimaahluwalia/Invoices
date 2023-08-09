import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  @Output() loader: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ShowLoader() {
    this.loader.emit(true);
  }

  HideLoader() {
    this.loader.emit(false);
  }
}
