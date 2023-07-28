import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Field, FieldType } from 'src/app/types/columnType';
import { ClientService } from 'src/app/services/clients/client.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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


  openModal() {
    this.openAddFields?.nativeElement?.click();
  }


  closeModal() {
    this.closeAddFields?.nativeElement.click();
    this.router.navigate(["add-invoice"]);
  }


  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }


  addcolumns() {
    const field: Field = new Field(FieldType.TEXT, "Column 1", 2, false, this.selectedColumnType);
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
  }


  onItemChange(i: number, item: Field) {
    if (item.custom) {
      item.fieldName = item.label as string;
    }
  }

}
