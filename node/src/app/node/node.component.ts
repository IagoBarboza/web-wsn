import { Component, OnInit } from '@angular/core';
import { NodeService } from './node.service';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent {

  constructor(private nodeService: NodeService) { 

    this.nodeService.enable();

  }
}
