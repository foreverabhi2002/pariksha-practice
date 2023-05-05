import { Component, Input } from '@angular/core';
import { FetchService } from 'src/app/service/fetch.service';

@Component({
  selector: 'app-practice-card',
  templateUrl: './practice-card.component.html',
  styleUrls: ['./practice-card.component.css'],
})
export class PracticeCardComponent {
  constructor(private fetch: FetchService) {}
  public tId: string = '';
  @Input() id: string | undefined;
  @Input() title: string | undefined;
  @Input() completed: string | undefined;

  click() {
    this.tId = this.id + '';
    this.fetch.setTestId(this.tId);
  }
}
