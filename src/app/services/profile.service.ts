import { Injectable } from '@angular/core';
import endpoints from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserProfile, userProfilepayload } from '../types/profile';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  public _userProfile: IUserProfile[] = [];

  constructor(private http: HttpClient) { }

  set userProfile(value: IUserProfile[]) {
    this._userProfile = value;
  }
  get userProfile(): IUserProfile[] {
    return this._userProfile;
  }

  uploadProfilePhoto(file: FormData): Observable<FormData> {
    return this.http.post<FormData>(endpoints.PROFILE.UPLOAD_PROFILE, file);
  }

  getProfile(): Observable<IUserProfile> {
    return this.http.get<IUserProfile>(endpoints.PROFILE.ADD);
  }

  updateProfile(updatedProfile: userProfilepayload) {
    return this.http.put(endpoints.PROFILE.UPDATE, updatedProfile);
  }
}
