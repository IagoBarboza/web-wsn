import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinkService} from './sink.service';
import { SinkComponent } from './sink.component';
import { MaterialModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    SinkComponent
  ],
  providers: [
    SinkService
  ],
  exports: [
    SinkComponent
  ]
})
export class SinkModule { }
