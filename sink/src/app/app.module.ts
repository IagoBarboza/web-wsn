import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { SinkModule } from './sink/sink.module';

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
    SinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
