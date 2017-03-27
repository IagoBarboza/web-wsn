import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class SinkService {
  
  // Communication Channel  
  private channel : FirebaseListObservable<any[]>;
  // Sink ID
  public id;
  // Bateria (Unidades de energia)
  public battery = 1000000; 
  // Frequência de transferência (ms)
  public frequencyOfTransfer = 1000;
  // Pacotes recebidos
  public packagesReceived = 0;
  // Pacotes aceitos
  public packagesAccepted = 0;
  // Pacotes rejeitados (buffer overflow)
  public packagesUnaccepted = 0;
  // Pacotes enviados à EB   
  public packagesSent = 0;
  // Timers
  private t1;
  private t2;
  // Último tamanho do canal   
  private length=0;    
  // Buffer
  public buffer=[];   

  constructor(af: AngularFire) { 
    this.id = Math.random()*100000000000000000;
    console.log(this.id);
    this.channel = af.database.list('channel');
  }

  enable(){
    // LISTENING
    this.t1 = this.timer();
    this.t1.start(()=>{
        console.log('Escutando no canal');
        this.battery = this.battery - 1;
    }, 1);

    // ESCUTANDO O CANAL NO FIREBASE
    this.channel.subscribe(snapshots => {
        
        // Loop dos novos pacotes do canal
        for(let i=this.length; i<snapshots.length; i++){
            // Incremento no número de pacotes recebidos
            this.packagesReceived++;
            // Pacote Atual
            let snapshot = snapshots[i];
            // Se tiver espaço no buffer para o novo pacote
            if(this.buffer.length < 4){
                // Incremento no número de pacotes aceitos
                this.packagesAccepted++;
                this.buffer.push(snapshot);             
            } 
            // Se não tiver espaço no buffer para o novo pacote
            else{
                // Incrementa o número de pacotes rejeitados                
                this.packagesUnaccepted++;
                // Envio de um pacote de alerta de diminuição de fluxo
                // this.channel.push({nid:'all', sid:this.id, data:'decrease-frequency-of-transfer'});
            } 
        }

        // Armazenando o último tamanho do canal, para pegar apenas os novos pacotes
        this.length = snapshots.length;
    });

    // ENVIANDO PACOTES PARA A ESTAÇÃO BASE
    this.t2 = this.timer();
    this.t2.start(()=>{
        // Se tiver pacote no buffer
        if(this.buffer.length >=1){
            // Desempilhando do buffer
            this.buffer.pop();
            // Incrementando o número de pacotes enviados à EB
            this.packagesSent++;
        }
    },this.frequencyOfTransfer, true);

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
