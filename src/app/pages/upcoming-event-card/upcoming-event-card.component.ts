import { Component, Input } from '@angular/core';
import { FetchService } from 'src/app/service/fetch.service';

@Component({
  selector: 'app-upcoming-event-card',
  templateUrl: './upcoming-event-card.component.html',
  styleUrls: ['./upcoming-event-card.component.css']
})
export class UpcomingEventCardComponent {

  constructor(private fetch: FetchService) { }

  @Input() id: string | undefined;
  @Input() title: string | undefined;
  @Input() date: string | undefined;
  @Input() time: string | undefined;
  @Input() registered: string | undefined;

  click() {
    const tId: string = this.id + "";
    this.fetch.setExamId(tId);
  }
}
