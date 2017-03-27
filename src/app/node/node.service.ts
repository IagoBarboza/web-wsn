import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class NodeService {
  
  // Communication Channels
  private channelN : FirebaseListObservable<any[]>; // Canal onde os nodes emitem e o sinks escutam
  private channelS : FirebaseListObservable<any[]>; // Canal onde os sinks emitem e os nodes escutam
  // Node ID
  public id;
  // Bateria (Unidades de energia)
  public battery = 1000000; 
  // Sink ID
  public sid = 12345;
  // Dados Coletados
  public dataCollected = 0 ;
  // Frequência de transferência (ms)
  public frequencyOfTransfer = 1000;
  // Pacotes enviados
  public packagesSent = 0;
  // Pacotes recebidos
  public packagesReceived = 0;
  // Pacotes rejeitados
  public packagesUnaccepted = 0;   
  // Timers
  private t1;
  private t2;
  private t3;
  // Último tamanho do canal   
  private length=0;    
  
  constructor(af: AngularFire) { 
    this.id = Math.random()*100000000000000000;
    console.log(this.id);
    this.channelN = af.database.list('channel-n');
    this.channelS= af.database.list('channel-s');    
}

  enable(){
    // COLETANDO DADOS
    this.t1 = this.timer();
    this.t1.start(()=>{
        console.log(`Coletando dados`);
				this.dataCollected ++;
				this.battery = this.battery - 10;
    }, 100, true);

    // ENVIANDO PACOTES 
    this.t2 = this.timer();
    this.t2.start(()=>{
      console.log("Enviando pacote");
      this.packagesSent++;
      this.channelN.push({sender: this.id, receiver: this.sid});
    }, this.frequencyOfTransfer, true);

    // ESCUTANDO NO CANAL ONDE OS SINKS EMITEM
    this.t3 = this.timer();
    this.t3.start(()=>{
        console.log('Escutando no canal');
        this.battery = this.battery - 1;
    }, 1); 

    // ESCUTANDO NO channelS
    this.channelS.subscribe(snapshots => {
        // Loop dos novos pacotes do channelN
        for(let i=this.length; i<snapshots.length; i++){
            // Incremento no número de pacotes recebidos
            this.packagesReceived++;
            // Pacote Atual
            let snapshot = snapshots[i];
            // O destinatário do pacote é esse node ou o destinatário 
            if(snapshot.receiver == this.id || snapshot.receiver == 'all'){
                // Alerta de diminuição de frequência de transferência de pacotes
                if(snapshot.data == 'decrease-frequency-of-transfer'){
                    this.frequencyOfTransfer+=1000;                    
                    this.t2.set_interval(this.frequencyOfTransfer);
                }
            }
            // O destinatário não é esse node
            else {
                // Incrementa o número de pacotes rejeitados                
                this.packagesUnaccepted++;    
            }   
        }

        // Armazenando o último tamanho do canal, para pegar apenas os novos pacotes
        this.length = snapshots.length;
    });

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
