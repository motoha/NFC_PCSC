import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private _router: Router,
     ) { }

  // isLoggedIn: boolean = false;
  // userRole: string = '';

  postData(credentials :any){

    return new Promise((resolve, reject) =>{

        let headers = new HttpHeaders()

.set('Content-Type', 'application/json')           
      
      this.http.post("https://reqres.in/api/login", JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res);
      }, (err) =>{
        reject(err);
      });
  
    });
  
  }

 
  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/auth/sign-in'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }
}