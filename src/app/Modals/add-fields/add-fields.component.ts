import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { COLUMNTYPE, Field } from 'src/app/types/columnType';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-add-fields',
  templateUrl: './add-fields.component.html',
  styleUrls: ['./add-fields.component.css']
})
export class AddFieldsComponent implements OnInit {
  @ViewChild('openModalButton', { static: false }) private openModalButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeModalButton', { static: false }) private closeModalButton!: ElementRef<HTMLButtonElement>;
  @Input() fields: Field[] = [];
  
  public columnType: any[] = Object.values(COLUMNTYPE);
  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  public data: any;
  constructor(
    public router: Router,
    public modalService: ModalService,
    private __ref: ChangeDetectorRef
    ) { }



  ngOnChanges(changes: SimpleChanges) {
    console.log(changes, "Changes")
    if (changes['fields'].currentValue && !changes?.['fields'].firstChange) {
      this.fields = changes['fields'].currentValue;
      this.__ref.detectChanges();
    }
  }

  /* ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.addField).pipe(takeUntil(this.destroyed)).subscribe(res => {
      const { status } = res;
      this.data = status;
      if (status) {
        this.openModal();
      } else {
        this.closeModal();
      }

    });

  } */
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
    const field: Field = new Field('TEXT', "Column 1", 2);
    this.fields.splice(1, 0, field);
  }

  deleteField(index: number) {
    this.fields.splice(index, 1);
  }

}
