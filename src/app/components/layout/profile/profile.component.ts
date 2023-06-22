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
  public userProfile: IUserProfile[] = []

  constructor(public profileService : ProfileService){}
  ngOnInit(): void {
    this.profileService.addProfile().subscribe((res:any) => {
      this.userProfile = res;
    })
  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
 
}
