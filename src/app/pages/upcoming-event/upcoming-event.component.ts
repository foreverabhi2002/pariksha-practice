import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FetchService } from 'src/app/service/fetch.service';
import { UpcomingEventCardComponent } from '../upcoming-event-card/upcoming-event-card.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-event',
  templateUrl: './upcoming-event.component.html',
  styleUrls: ['./upcoming-event.component.css'],
})
export class UpcomingEventComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  exams: any = [];
  public authStatus: any;
  constructor(
    public apiService: ApiService,
    public router: Router,
    public fetch: FetchService
  ) {
    this.checkAuthStatus();
    this.getAllExams();
  }

  public async checkAuthStatus() {
    this.authStatus = await localStorage.getItem('accessToken');
    if (!this.authStatus) {
      this.router.navigate(['/login']);
    }
  }

  public getAllExams() {
    this.apiService.getAllQuizzes().subscribe(async (res) => {
      console.log(res);
      this.exams = await res;

      for (let i = 0; i < this.exams.length; i++) {
        this.createComponent(
          this.exams[i]._id,
          this.exams[i].title,
          this.exams[i].eventDate,
          this.exams[i].eventTime,
          this.exams[i].registered
        );
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  createComponent(
    id: string,
    title: string,
    date: string,
    time: string,
    registered: any
  ) {
    const widgetOneRef = this.container.createComponent(
      UpcomingEventCardComponent
    );
    widgetOneRef.setInput('id', id);
    widgetOneRef.setInput('title', title);
    widgetOneRef.setInput('date', date);
    widgetOneRef.setInput('time', time);

    var uiReg;

    if (registered > 1000000000000) {
      uiReg = Math.floor(registered / 1000000000000) + 'T';
    } else if (registered > 1000000000) {
      uiReg = Math.floor(registered / 1000000000) + 'B';
    } else if (registered > 1000000) {
      uiReg = Math.floor(registered / 1000000) + 'M';
    } else if (registered > 1000) {
      uiReg = Math.floor(registered / 1000) + 'K';
    } else {
      uiReg = registered;
    }

    widgetOneRef.setInput('registered', uiReg);
  }
}
