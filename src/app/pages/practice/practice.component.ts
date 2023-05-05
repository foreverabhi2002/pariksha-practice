import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FetchService } from 'src/app/service/fetch.service';
import { PracticeCardComponent } from '../practice-card/practice-card.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'],
})
export class PracticeComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  tests: any = [];
  public authStatus: any;
  constructor(
    public apiService: ApiService,
    public router: Router,
    public fetch: FetchService
  ) {
    this.checkAuthStatus();
    this.getAllTests();
  }

  public async checkAuthStatus() {
    this.authStatus = await localStorage.getItem('accessToken');
    if (!this.authStatus) {
      this.router.navigate(['/login']);
    }
  }

  public getAllTests() {
    this.apiService.getAllQuizzes().subscribe(async (res) => {
      console.log(res.data);
      this.tests = await res.data;

      for (let i = 0; i < this.tests.length; i++) {
        this.createComponent(
          this.tests[i]._id,
          this.tests[i].title,
          (this.tests[i].completed = 128)
        );
      }
    });
  }

  ngAfterViewInit() {
    // var x = window.screen.width / 380;
    // console.log(x);
    // for(let i=1; i<=30; i++){
    //   this.createComponent('Test '+i);
    // }
  }

  createComponent(id: string, title: string, completed: any) {
    const widgetOneRef = this.container.createComponent(PracticeCardComponent);
    widgetOneRef.setInput('id', id);
    widgetOneRef.setInput('title', title);
    var uiComp;

    if (completed > 1000000000000) {
      uiComp = Math.floor(completed / 1000000000000) + 'T';
    } else if (completed > 1000000000) {
      uiComp = Math.floor(completed / 1000000000) + 'B';
    } else if (completed > 1000000) {
      uiComp = Math.floor(completed / 1000000) + 'M';
    } else if (completed > 1000) {
      uiComp = Math.floor(completed / 1000) + 'K';
    } else {
      uiComp = completed;
    }

    widgetOneRef.setInput('completed', uiComp);
  }
}
