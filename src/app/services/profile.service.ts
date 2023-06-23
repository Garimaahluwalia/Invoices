import { Injectable } from '@angular/core';
import endpoints from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserProfile } from '../types/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public _userProfile: IUserProfile[] = [];
  constructor(private http: HttpClient) { }
  private userProfileSubject: BehaviorSubject<IUserProfile[]> = new BehaviorSubject<IUserProfile[]>([]);

  set userProfile(value: IUserProfile[]) {
    this._userProfile = value;
  }
  get userProfile(): IUserProfile[] {
    return this._userProfile;
  }



  uploadProfilePhoto(file: FormData): Observable<any> {
    // const formData: FormData = new FormData();
    // formData.append('photo', file);
    console.log(endpoints.PROFILE.UPLOAD_PROFILE, file)
    return this.http.post<any>(endpoints.PROFILE.UPLOAD_PROFILE, file);
  }
  addProfile(): Observable<any> {
    return this.http.get<IUserProfile>(endpoints.PROFILE.ADD);
  }

  get(): Observable<any[]> {
    return this.http.get<any[]>(endpoints.PROFILE.GETALL);
  }
  updateProfile(profileId: string, data: any) {
    return this.http.put(endpoints.PROFILE.GET(profileId), data);
  }
}
