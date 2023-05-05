import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {

  @ViewChild('videoElement')
  videoElement!: ElementRef<HTMLVideoElement>;

  @ViewChild('photo')
  photo!: ElementRef;
  //photo = document.getElementById('photo');

  private stream!: MediaStream;
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;

  public isClicked: boolean;

  image: any;

  constructor(private _router: Router) {
    this.isClicked = false;
  }

  ngOnInit() {
    this.startCamera();
  }

  startCamera() {
    // Get the webcam stream and set it as the source of the video element
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.stream = stream;
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch(error => {
        console.error(`Could not access webcam: ${error}`);
      });
  }

  ngOnDestroy() {
    // Stop the webcam stream when the component is destroyed
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }

  capture() {
    // Create a canvas element to capture the image
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    // Set the canvas dimensions to match the video stream
    this.canvas.width = this.videoElement.nativeElement.videoWidth;
    this.canvas.height = this.videoElement.nativeElement.videoHeight;

    // Draw the current frame of the video onto the canvas
    this.context.drawImage(this.videoElement.nativeElement, 0, 0);

    // Get the image data from the canvas
    const imageData = this.canvas.toDataURL('image/jpeg');

    // Do something with the image data, such as displaying it in an <img> element
    const img = document.createElement('img');
    img.src = imageData;

    this.image = imageData;


    console.log(imageData);

    this.isClicked = true;

    this.stopBothVideoAndAudio(this.stream);
    //document.body.appendChild(img);
  }

  retake(){
    this.startCamera();
    this.isClicked = false;
  }


  LaunchExam() {
    this.stopBothVideoAndAudio(this.stream);
    this._router.navigateByUrl('exam/launch');
  }




  stopBothVideoAndAudio(stream: any) {
    stream.getTracks().forEach(function (track: any) {
      if (track.readyState == 'live') {
        track.stop();
      }
    });
  }


  /*
  constructor(private _router: Router) { }

  ngOnInit() {

  }

  @ViewChild("video")
  video!: ElementRef;

  @ViewChild("canvas")
  canvas!:ElementRef;

  

  public streaming = false;
  error: any;
  private stream: MediaStream | undefined;
  private constraints = {
    audio: true,
    video: true,
  };

  


  ngAfterViewInit() {
    this.initVideo();
  }

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

    const video_constraints = this.constraints;
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

  LaunchExam() {
    this.stopBothVideoAndAudio(this.stream);
    this._router.navigateByUrl('exam/launch');
  }

  ClickPhoto() {

    this.canvas.nativeElement.getContext('2d').drawImage(this.video, 0, 0);//, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    let image_data_url = this.canvas.nativeElement.toDataURL('image/jpeg');

    // data url of the image
    console.log(image_data_url);

  }


  stopBothVideoAndAudio(stream: any) {
    stream.getTracks().forEach(function (track: any) {
      if (track.readyState == 'live') {
        track.stop();
      }
    });
  }
  */
}
