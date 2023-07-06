import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
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


  constructor(public profileService: ProfileService) { }
  
  ngOnInit(): void {
    this.profileService.getProfile().subscribe((res: any) => {
      this.userProfile = res;
      console.log(this.userProfile, "UserProfile");
      this.profileImage = res.photoUrl
    });
  }


  // ngOnDestroy(): void {
  //   this.destroyed.next(true);
  //   this.destroyed.complete();
  // }
  
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile() {
    this.profileService.updateProfile(this.userProfile).subscribe(
      (response) => {
        console.log(response, "update responses")
        this.isEditMode = false;
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
    this.profileService.uploadProfilePhoto(file).subscribe(
      (response: any) => {
      },
      (error) => {
        console.error('Upload error:', error);
      }
    );
  }



}
