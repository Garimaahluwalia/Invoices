import { Injectable ,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public isMobile:EventEmitter<boolean>=new EventEmitter();

  constructor() { }

  
}
