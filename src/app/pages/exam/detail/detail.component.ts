import { Component } from '@angular/core';
import { FetchService } from 'src/app/service/fetch.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  constructor(private fetch:FetchService){
    console.log(fetch.examId);
  }

}
