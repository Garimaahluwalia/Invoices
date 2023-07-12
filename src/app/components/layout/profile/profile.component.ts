import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ProfileService } from 'src/app/services/profile.service';
import { IUserProfile } from 'src/app/types/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public isEditMode = false;
  public userProfile: any;
  public profilePhoto!: any;
  public selectedFile!: File;
  public profileImage: any;
  public Image: any;
  private destroyed: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);
  private readonly notifier!: NotifierService;


  constructor(public profileService: ProfileService,
    public notifierService: NotifierService) { 
      this.notifier = notifierService;
    }

  ngOnInit(): void {
    this.profileService.getProfile().pipe(takeUntil(this.destroyed)).subscribe((res: any) => {
      this.userProfile = res;
      console.log(this.userProfile, "UserProfile");
      this.profileImage = res.photoUrl
    });
  }


  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile() {
    const payload = {
      name: this.userProfile.name,
      email: this.userProfile.email,
      mobile: this.userProfile.mobile,
      registeredOn: this.userProfile.registeredOn,
      gstIn: this.userProfile.gstIn,
      pan: this.userProfile.pan,
      address: this.userProfile.address,
      accountDetails: {
        accHolderName: this.userProfile.accountDetails.accHolderName,
        bankName: this.userProfile.accountDetails.bankName,
        branchName: this.userProfile.accountDetails.branchName,
        accountNumber: this.userProfile.accountDetails.accountNumber,
        ifscCode: this.userProfile.accountDetails.ifscCode
      }
    };
    this.profileService.updateProfile(payload).pipe(takeUntil(this.destroyed)).subscribe(
      (response) => {
        // console.log(response, "update responses")
        this.isEditMode = false;
        this.notifier.notify('success', 'Profile updated successfully');
      },
      (error) => {
        console.error('Profile update failed:', error);
      }
    );
  }


  onFileSelected(event: any) {
    const file: FileList = event.target.files;
    console.log(event.target.files, "images uploaded")
    if (file && file.length > 0) {
      const fileToUpload: File = file[0];
      this.profileImage = URL.createObjectURL(fileToUpload)
      const formData: FormData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.uploadProfilePhoto(formData);
    }
  }


  uploadProfilePhoto(file: FormData) {
    this.profileService.uploadProfilePhoto(file).pipe(takeUntil(this.destroyed)).subscribe(
      (response: any) => {
        this.notifier.notify('success', 'Profile updated successfully');
      },
      (error) => {
        console.error('Upload error:', error);
      }
    );
  }



}
