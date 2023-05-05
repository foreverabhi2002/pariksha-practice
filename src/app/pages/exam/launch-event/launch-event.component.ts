import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { NavbarService } from 'src/app/service/navbar.service';
import { QuestionService } from 'src/app/service/question.service';
import { QuesPaletteBtnComponent } from '../ques-palette-btn/ques-palette-btn.component';
import { ExamService } from 'src/app/service/exam.service';
import { FetchService } from 'src/app/service/fetch.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-launch-event',
  templateUrl: './launch-event.component.html',
  styleUrls: ['./launch-event.component.css']
})
export class LaunchEventComponent implements OnInit, AfterViewInit {

  public name: string = "";
  public questionList: any;
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60 * 5;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;

  timeRemaining: string = "5:00";

  Response:any;

  responseAns: any = new Map();


  constructor(
    @Inject(DOCUMENT) private document: any,
    private _router: Router,
    private questionService: QuestionService,
    private nav: NavbarService,
    public examSrvc: ExamService,
    private userSrvc: UserService,
    private fetch: FetchService
  ) {
    this.getAllQuestions();
    // this.responseAns.set("0", "0");
  }

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;



  ngAfterViewInit() {

    this.initVideo();

    //console.log(this.questionList);

    this.examSrvc.totalQues = this.questionList.length;

    for (let i = 1; i <= this.questionList.length; i++) {
      this.createComponent('' + i);
    }

  }


  

  createComponent(title: string) {
    const widgetOneRef = this.container.createComponent(QuesPaletteBtnComponent);
    widgetOneRef.setInput('name', title);
  }

  elem: any;

  isFullscreenResult: boolean = false;
  privateIsFullscreenResult: boolean = false;



  ngOnInit() {
    this.elem = document.documentElement;

    document.onfullscreenchange = () => {
      this.isFullscreenResult = this.checkFullScreeen();
      console.log(this.checkFullScreeen())
      if (this.privateIsFullscreenResult != this.isFullscreenResult) {
        this.cancelExam();
      }
    }

    this.openFullscreen();
    this.nav.hide();

    this.name = localStorage.getItem("name")!;

    this.startCounter();
  }


  ngOnDestroy() {
    // Stop the webcam stream when the component is destroyed
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }

    this.stopCounter();
  }


  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }
  nextQuestion() {
    this.examSrvc.nextQues();
    // this.currentQuestion++;
  }
  previousQuestion() {
    this.examSrvc.prevQues();
    // this.currentQuestion--;
  }

  select(currentQno: any, option: any) {


    this.responseAns.set(currentQno + "", option.text);

    this.examSrvc.ansAction.set(currentQno + "", "Answered");

    // console.log(currentQno);

  }

  isSelected(currentQno: any, option: any) {


    if (this.responseAns.get(currentQno + "") == option.text) {
      return true;
    }

    return false

  }

  // answer(currentQno: number, option: any) {

  //   if (currentQno === this.questionList.length) {
  //     this.isQuizCompleted = true;
  //     this.stopCounter();
  //   }
  //   if (option.correct) {
  //     this.points += 10;
  //     this.correctAnswer++;
  //     setTimeout(() => {
  //       this.currentQuestion++;
  //       this.resetCounter();
  //       this.getProgressPercent();
  //     }, 1000);


  //   } else {
  //     setTimeout(() => {
  //       this.currentQuestion++;
  //       this.inCorrectAnswer++;
  //       this.resetCounter();
  //       this.getProgressPercent();
  //     }, 1000);

  //     this.points -= 10;
  //   }
  // }

  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        var min = this.counter / 60;
        // console.log(min);
        this.timeRemaining = (Math.floor(this.counter / 60)) + ":" + (this.counter % 60);

        if (this.counter === 0) { this.FinalSubmit(); }

        // if (this.counter === 0) {
        //   this.currentQuestion++;
        //   this.counter = 60;
        //   this.points -= 10;
        // }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;

  }

  cancelExam() {
    this.stopBothVideoAndAudio(this.stream);
    this.nav.show();
    this._router.navigateByUrl('/exam/failed');

  }

  checkFullScreeen(): boolean {
    return !!(this.document.fullscreenElement || this.document.mozFullScreenElement || this.document.webkitFullscreenElement || this.document.msFullscreenElement);
  }

  openFullscreen() {

    this.privateIsFullscreenResult = true;

    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {

    this.privateIsFullscreenResult = false;

    if (this.checkFullScreeen()) {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  @ViewChild("video")
  video!: ElementRef;

  streaming = false;
  error: any;
  private stream: MediaStream | undefined;
  private constraints = {
    audio: true,
    video: true,
  };





  initVideo() {
    this.getMediaStream()
      .then((stream) => {
        this.stream = stream;
        this.streaming = true;
      })
      .catch((err) => {
        this.streaming = false;
        this.error = err.message + " (" + err.name + ":" + err.constraintName + ")";
      });
  }
  private getMediaStream(): Promise<MediaStream> {

    const video_constraints = this.constraints; //{ video: true };
    const _video = this.video.nativeElement;
    return new Promise<MediaStream>((resolve, reject) => {
      // (get the stream)
      return navigator.mediaDevices.
        getUserMedia(video_constraints)
        .then(stream => {
          (<any>window).stream = stream; // make variable available to browser console
          _video.srcObject = stream;
          // _video.src = window.URL.createObjectURL(stream);
          _video.onloadedmetadata = function (e: any) { };
          _video.muted = true;
          _video.play();
          return resolve(stream);
        })
        .catch(err => reject(err));
    });
  }

  FinalSubmit() {
    console.log(this.responseAns);
    this.closeFullscreen();
    this.stopBothVideoAndAudio(this.stream);

    this.submitData();

   

  }


  submitData() {

    const Data = {
      userId: this.userSrvc.id,
      examId: this.fetch.examId,
      response:this.Response,
      isDisqualified : false

    };

    console.log(Data);


    this.fetch.submitResponse(Data).subscribe((data) => {

      
      this.nav.show();
      this._router.navigateByUrl('exam/response');
      alert('Submitted answers sucessfully');
      console.log("Submitted answers sucessfully !!");

    });
  }

  stopBothVideoAndAudio(stream: any) {
    stream.getTracks().forEach(function (track: any) {
      if (track.readyState == 'live') {
        track.stop();
      }
    });
  }
}
