import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent {
  @Input() svg: string | null | undefined;
  @Input() className?: string[] | string;
  @Input() height: number = 20;
  @Input() width: number = 20;
  
  @Output() OnSVGClick: EventEmitter<boolean> = new EventEmitter();

  onClick() {
    this.OnSVGClick.emit(true);
  }
}
