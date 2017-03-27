import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeService} from './node.service';
import { NodeComponent } from './node.component';
import { MaterialModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    NodeComponent
  ],
  providers: [
    NodeService
  ],
  exports: [
    NodeComponent
  ]
})
export class NodeModule { }
