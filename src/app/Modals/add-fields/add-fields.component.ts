import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalEvents } from 'src/app/types/modal';

@Component({
  selector: 'app-add-fields',
  templateUrl: './add-fields.component.html',
  styleUrls: ['./add-fields.component.css']
})
export class AddFieldsComponent {

  public destroyed: ReplaySubject<boolean> = new ReplaySubject(0);
  public data: any;
  constructor(public router: Router,
    public modalService: ModalService) { }
  @ViewChild('openModalButton', { static: false }) private openModalButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeModalButton', { static: false }) private closeModalButton!: ElementRef<HTMLButtonElement>;


  ngAfterViewInit(): void {
    this.modalService.recieveEvent(ModalEvents.addField).pipe(takeUntil(this.destroyed)).subscribe(res => {
      const { status } = res;
      this.data = status;
      console.log(this.data, "STATUS OF ADD-Field")
      if (status) {
        this.openModal();
      } else {
        this.closeModal();
      }

    });

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
}
