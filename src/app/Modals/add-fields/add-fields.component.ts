import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Field, FieldType } from 'src/app/types/columnType';
import { ClientService } from 'src/app/services/clients/client.service';

@Component({
  selector: 'app-add-fields',
  templateUrl: './add-fields.component.html',
  styleUrls: ['./add-fields.component.css'],

})
export class AddFieldsComponent implements OnInit {
  @ViewChild('openAddFields', { static: false }) private openAddFields!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeAddFields', { static: false }) private closeAddFields!: ElementRef<HTMLButtonElement>;
  @Input() fields: Field[] = [];

  @Output() onSave = new EventEmitter<Field[]>();

  public FieldTpes: string[] = Object.values(FieldType);
  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  public show: boolean[] = [];
  public selectedColumnType: any;
  public draggedItemIndex!: number;
  
  
  constructor(
    public router: Router,
    public modalService: ModalService,
    private __ref: ChangeDetectorRef,
    public clientService: ClientService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields'].currentValue && !changes?.['fields'].firstChange) {
      this.fields = changes['fields'].currentValue;
      this.__ref.detectChanges();
    }
  }

  ngOnInit(): void {
  }

  //  DRAG AND DROP STARTS HERE 

  dragStart(event: any, index: number) {
    event.dataTransfer.setData('text/plain', index);
    this.draggedItemIndex = index;
  }

  dragOver(event: any, index: number) {
    event.preventDefault();
    if (this.draggedItemIndex === index) {
      return;
    }
    let temp = this.fields[this.draggedItemIndex];
    this.fields[this.draggedItemIndex] = this.fields[index];
    this.fields[index] = temp;
    this.draggedItemIndex = index;
  }

  drop(event: any, index: number) {
    event.preventDefault();
  }

  // DRAG AND DROP ENDS HERE 





  openModal() {
    this.openAddFields?.nativeElement?.click();
  }


  closeModal() {
    this.closeAddFields?.nativeElement.click();
    /* this.router.navigate(["add-invoice"]); */
  }

  addcolumns() {
    const field: Field = new Field(FieldType.TEXT, this.makeKey(), 2, false, true, true, "Column 1");
    this.fields.splice(1, 0, field);
  }

  onColumnChange(event: any) {
    this.selectedColumnType = event.target.value;
    console.log(this.selectedColumnType, "COLUMN TYPE")
  }

  deleteField(index: number) {
    this.fields.splice(index, 1);
  }

  togglePassword(item: Field) {
    item.hidden = !item.hidden;
  }

  saveChanges() {
    this.onSave.emit(this.fields);
    console.log(this.fields, "Fields")
    this.closeModal();
  }

  onItemChange(i: number, item: Field) {
    if (item.custom) {
      // item.fieldName = item.label as string;
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  makeKey(length: number = 5) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
