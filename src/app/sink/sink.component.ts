import { Component, OnInit } from '@angular/core';
import { SinkService } from './sink.service';

@Component({
  selector: 'sink',
  templateUrl: './sink.component.html',
  styleUrls: ['./sink.component.css']
})
export class SinkComponent {

  constructor(public sinkService: SinkService) { 

    // this.sinkService.enable();

  }
}
