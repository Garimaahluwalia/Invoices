import { Component, OnInit} from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { IUserProfile } from 'src/app/types/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public isEditMode = false;
  public userProfile: IUserProfile[] = [];
  public profilePhoto! : any;
 public  selectedFile!: File ;

  constructor(public profileService : ProfileService){}
  ngOnInit(): void {
    this.profileService.addProfile().subscribe((res:any) => {
      this.userProfile = res;
    });
  }


  onFileSelected(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length) {
      this.selectedFile = fileInput.files[0];
      console.log(this.selectedFile.name);
    }
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('filename', this.selectedFile);
  
      this.profileService.uploadProfilePhoto(formData).subscribe((res: any) => {
        this.profilePhoto = res;
        console.log(this.profilePhoto);
      });
    } else {
  
      console.log('No file selected');
    }
  }




  
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }




 
}
