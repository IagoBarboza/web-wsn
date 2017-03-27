import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NodeModule } from './node/node.module';
import { SinkModule } from './sink/sink.module';

import { NodeComponent } from './node/node.component';
import { SinkComponent } from './sink/sink.component';

export const firebaseConfig = {
  apiKey: "AIzaSyC0QNh31XmC_iLKd_tje3H53rgmrLNYiV4",
  authDomain: "web-wsn.firebaseapp.com",
  databaseURL: "https://web-wsn.firebaseio.com",
  storageBucket: "web-wsn.appspot.com",
  messagingSenderId: "1017678454693"
};
  
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot([
      { path: 'node', component: NodeComponent },
      { path: 'sink', component: SinkComponent }
    ]),
    NodeModule,
    SinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
