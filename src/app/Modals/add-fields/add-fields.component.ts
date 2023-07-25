import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { COLUMNTYPE } from 'src/app/types/columnType';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-add-fields',
  templateUrl: './add-fields.component.html',
  styleUrls: ['./add-fields.component.css']
})
export class AddFieldsComponent implements OnInit {
  @ViewChild('openModalButton', { static: false }) private openModalButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeModalButton', { static: false }) private closeModalButton!: ElementRef<HTMLButtonElement>;
  @Input() fields: any[] = []
  
  public columnType: any[] = Object.values(COLUMNTYPE);
  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  public data: any;
  constructor(public router: Router,
    public modalService: ModalService) { }



  ngOnChanges(changes: SimpleChanges) {
    console.log(changes, "Changes")
    if (changes['fields'].currentValue && !changes?.['fields'].firstChange) {
      this.fields = changes['fields'].currentValue;
    }
  }

  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.addField).pipe(takeUntil(this.destroyed)).subscribe(res => {
      const { status } = res;
      this.data = status;
      if (status) {
        this.openModal();
      } else {
        this.closeModal();
      }

    });

  }
  ngOnInit(): void {
    console.log(this.fields, "FIELDS")
  }




  openModal() {
    this.openModalButton?.nativeElement?.click();
  }


  closeModal() {
    this.closeModalButton?.nativeElement.click();
    this.router.navigate(["add-invoice"]);
  }


  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }


  addcolumns() {

  }

}
