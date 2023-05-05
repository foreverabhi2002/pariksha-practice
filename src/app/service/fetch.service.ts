import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
export class FetchService {

  examId: string;
  testId: string;

  constructor(private http: HttpClient) {
    this.examId = "";
    this.testId = "";
  }

  getAllExams(): Observable<any> {
    return this.http.get(environment.SERVER_URL + 'quizzes');
  }

  getAllTests(): Observable<any> {
    return this.http.get(environment.SERVER_URL + 'tests');
  }

  getExam(): Observable<any> {
    const data = { id: this.examId };
    return this.http.post(environment.SERVER_URL + 'get_exam', data, httpOptions);
  }

  getTest(): Observable<any> {
    const data = { id: this.testId };
    return this.http.post(environment.SERVER_URL + 'get_test', data, httpOptions);
  }

  setExamId(id: string) {
    this.examId = id;
  }

  clearExamId(id: string) {
    this.examId = "";
  }

  setTestId(id: string) {
    return this.testId = id;
  }

  clearTestId(id: string) {
    this.testId = "";
  }

  submitResponse(data: any): Observable<any> {
    return this.http.post(environment.SERVER_URL + 'add_response', data, httpOptions);
  }
}
