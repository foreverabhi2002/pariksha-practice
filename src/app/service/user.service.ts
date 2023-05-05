import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// const url = "http://localhost:3000/"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

interface myData {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogined: boolean;
  id: string;
  nameInitial: string;
  firstName: string;

  constructor(private http: HttpClient) {

    this.isLogined = false;
    this.id='';
    this.nameInitial = '';
    this.firstName = ''

  }
  // sdsdsdf

  createUser(data: any):Observable<any>{
    
    return this.http.post<myData>(environment.SERVER_URL+`add_user`,data, httpOptions);
  };

  loginUser(data: any):Observable<any>{
    
    return this.http.post<myData>(environment.SERVER_URL+`login`,data, httpOptions);
  };

  // getUser(data)

}
