import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, public router: Router) {}

  // Auth-----------------------------

  public register(data: any): Observable<any> {
    return this.http.post(`${environment.SERVER_URL}/accounts/register`, data);
  }

  public login(data: any): Observable<any> {
    data['accessStatus'] = 'user';
    return this.http.post(`${environment.SERVER_URL}/accounts/login`, data);
  }

  //  User-----------------------------
  public getUser(id: any): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/accounts/whoAmI/${id}`);
  }

  // Categories-------------------------
  public createCategory(data: any) {
    return this.http.post(
      `${environment.SERVER_URL}/categories/createCategory`,
      data
    );
  }

  public getAllCategories(): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/categories`);
  }

  public getCategory(id: any): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/categories/${id}`);
  }

  public updateCategory(id: any, data: any): Observable<any> {
    return this.http.patch(`${environment.SERVER_URL}/categories/${id}`, data);
  }

  // Quiz-------------------------------------
  public createQuiz(data: any) {
    return this.http.post(`${environment.SERVER_URL}/quizzes/createQuiz`, data);
  }

  public getAllQuizzes(): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/quizzes`);
  }

  public getQuiz(id: any): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/quizzes/${id}`);
  }

  public updateQuiz(id: any, data: any): Observable<any> {
    return this.http.patch(`${environment.SERVER_URL}/quizzes/${id}`, data);
  }

  // Question----------------------------------
  public createQuestion(data: any) {
    console.log(data);
    return this.http.post(
      `${environment.SERVER_URL}/questions/createQuestion`,
      data
    );
  }

  public getAllQuestions(): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/questions`);
  }

  public getQuestion(id: any): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/questions/${id}`);
  }

  public updateQuestion(id: any, data: any): Observable<any> {
    console.log(id, data);
    return this.http.patch(`${environment.SERVER_URL}/questions/${id}`, data);
  }
}
