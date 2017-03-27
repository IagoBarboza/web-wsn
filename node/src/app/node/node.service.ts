import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class NodeService {
  
  // Communication Channel  
  private channel : FirebaseListObservable<any[]>;
  // Node ID
  public id;
  // Bateria (Unidades de energia)
  public battery = 1000000; 
  // Sink ID
  public sid = 0;
  // Dados Coletados
  public dataCollected = 0 ;
  // Frequência de transferência (ms)
  public frequencyOfTransfer = 1000;
  // Pacotes enviados
  public packagesSent = 0;
  // Pacotes entregues
  public packagesDelivered = 0;
  // Pacotes perdidos
  public packagesLost = 0;
  // Timers
  private t1;
  private t2;
  private t3;

  constructor(af: AngularFire) { 
    this.id = Math.random()*100000000000000000;
    console.log(this.id);
    this.channel = af.database.list('channel');
  }

  enable(){
    // DATA COLLECTION
    this.t1 = this.timer();
    this.t1.start(()=>{
        console.log(`Coletando dados`);
				this.dataCollected ++;
				this.battery = this.battery - 10;
    }, 100, true);

    // TRANSFER 
    this.t2 = this.timer();
    this.t2.start(()=>{
      console.log("Enviando pacote");
      this.packagesSent++;
      this.channel.push({nid:this.id, sid:this.sid, data:'Temperatura', status:'sent'});
    }, this.frequencyOfTransfer, true);

    // LISTENING
    this.t3 = this.timer();
    this.t3.start(()=>{
        console.log('Escutando no canal');
        this.battery = this.battery - 1;
    }, 1);
  }

  timer(){
	    var timer = {
	        running: false,
	        iv: 5000,
	        timeout: false,
	        cb : function(){},
	        start : function(cb,iv,sd){
	            var elm = this;
	            clearInterval(this.timeout);
	            this.running = true;
	            if(cb) this.cb = cb;
	            if(iv) this.iv = iv;
	            if(sd) elm.execute(elm);
	            this.timeout = setTimeout(function(){elm.execute(elm)}, this.iv);
	        },
	        execute : function(e){
	            if(!e.running) return false;
	            e.cb();
	            e.start();
	        },
	        stop : function(){
	            this.running = false;
	        },
	        set_interval : function(iv){
	            clearInterval(this.timeout);
	            this.start(false, iv);
	        }
	    };
    	return timer;
	}

}
