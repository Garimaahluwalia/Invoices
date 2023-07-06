import { Injectable } from '@angular/core';
import endpoints from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserProfile } from '../types/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public _userProfile: any[] = [];
  constructor(private http: HttpClient) { }
  private userProfileSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);



  set userProfile(value: any[]) {
    this._userProfile = value;
  }
  get userProfile(): any[] {
    return this._userProfile;
  }

  uploadProfilePhoto(file: FormData): Observable<any> {
    console.log(endpoints.PROFILE.UPLOAD_PROFILE, file)
    return this.http.post<any>(endpoints.PROFILE.UPLOAD_PROFILE, file);
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(endpoints.PROFILE.ADD);
  }

  updateProfile(updatedProfile: any) {
    return this.http.put(endpoints.PROFILE.UPDATE, updatedProfile);
  }
}
