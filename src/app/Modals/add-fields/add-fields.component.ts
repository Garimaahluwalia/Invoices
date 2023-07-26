import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { COLUMNTYPE, Field } from 'src/app/types/columnType';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ClientService } from 'src/app/services/clients/client.service';

@Component({
  selector: 'app-add-fields',
  templateUrl: './add-fields.component.html',
  styleUrls: ['./add-fields.component.css']
})
export class AddFieldsComponent implements OnInit {
  @ViewChild('openModalButton', { static: false }) private openModalButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeModalButton', { static: false }) private closeModalButton!: ElementRef<HTMLButtonElement>;
  @Input() fields: Field[] = [];

  @Output() onSave = new EventEmitter<Field[]>();

  public columnType: any[] = Object.values(COLUMNTYPE);
  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  public data: any;
  public show: boolean[] = [];

  constructor(
    public router: Router,
    public modalService: ModalService,
    private __ref: ChangeDetectorRef,
    public clientService : ClientService
  ) { }



  ngOnChanges(changes: SimpleChanges) {
    console.log(changes, "Fields Changes")
    if (changes['fields'].currentValue && !changes?.['fields'].firstChange) {
      this.fields = changes['fields'].currentValue;
      this.__ref.detectChanges();
    }
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
    const field: Field = new Field('TEXT', "Column 1", 2 , false);
    this.fields.splice(1, 0, field);
  }

  deleteField(index: number) {
    this.fields.splice(index, 1);
  }

  togglePassword(index: number) {
    this.show[index] = !this.show[index];
  }

  saveChanges() {
    this.onSave.emit(this.fields);
    this.closeModal();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
  }

}
