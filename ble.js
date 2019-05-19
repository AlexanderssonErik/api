let ble = {
  _connectButton: 0,
  timeOut: 0,
  shortTimeOut: 0,
  buttonHideTimeOut: 0,
  busySend: false,
  gattServer: 0,
  gattService: 0,
  gattCharacteristic: 0,
  receivedData: [],
  blocksReceiving: 0,
  bluetoothDevice : null,

  init: function(){


    this._connectButton = new GuiButtonImg( "./icon/ble/bluetooth.svg", ble.connect);
   // this._connectButton.setVisible(0,0, guiOptions.center, guiOptions.center);
  },
  buttonHideTimeOutFunction : function(){

    Game.close(); 
    ble._connectButton.setVisible(0,0, guiOptions.center, guiOptions.center);


  },
  callAfterDatabaseLogin : function(){
    ble._connectButton.setVisible(0,0, guiOptions.center, guiOptions.center);
  },
  connect: function(){

    /*if(help.active){
      help.clickForHelp("ble");
      return;
    }*/

    //guiSettings.clickFullScreenOn();

    navigator.bluetooth.requestDevice({
      filters: [{
        services: ['4880c12c-fdcb-4077-8920-a450d7f9b907']
      }]
    })   
    .then(device => {
      clearTimeout(ble.buttonHideTimeOut);                      
      ble.buttonHideTimeOut = setTimeout(ble.buttonHideTimeOutFunction, 10000);
      ble._connectButton.setNotVisible();
      ble.bluetoothDevice = device;
      console.log('Connecting to GATT Server...');
      return device.gatt.connect();
    })
    .then(server => {
      console.log('Found GATT server');
      ble.gattServer = server;
      //Get service
      return ble.gattServer.getPrimaryService('4880c12c-fdcb-4077-8920-a450d7f9b907');
    })
    .then(service => {
      console.log('Found GATT service');
      ble.gattService = service;
      // Get characteristic
      return ble.gattService.getCharacteristic('fec26ec4-6d71-4442-9f81-55bc21d658d6');
    })
    .then(characteristic => {
      
      console.log('Found characteristic');
 
      clearTimeout(ble.buttonHideTimeOut); 
      ble.gattCharacteristic = characteristic;
      clearTimeout(ble.timeOut);                      
      ble.timeOut = setTimeout(ble.sendEmptyCommand, 500);
      ble._connectButton.setNotVisible();
       // Listen to device notifications
      return ble.gattCharacteristic.startNotifications().then(() => {
        ble.gattCharacteristic.addEventListener('characteristicvaluechanged', event => {

          //DEBUG
          /*  console.log("in data");
       let inData = [];
         for(let z = 0; z <event.target.value.byteLength; z++ ){
             inData[z] = event.target.value.getUint8(z).toString(16);
             console.log('inData[z] ' + inData[z] );
             //inData += ' ';

         }*/
        
          let i = 0;
       //  receivedData   
          let recivedDataLength =  ble.receivedData.length;
          for(; i < event.target.value.byteLength; i++){
            ble.receivedData[i + recivedDataLength]  =  event.target.value.getUint8(i);
          }
          i =0;
          if(ble.blocksReceiving == 0){
            while(i < ble.receivedData.length){
              if(ble.receivedData[i] == 0x80){
                ble.receivedData.splice(0, i +1);                                
                ble.blocksReceiving = 1;
                break;
              }else{
                i++;
              }
            }
          }
          if(ble.blocksReceiving == 1){
            while( 3 < ble.receivedData.length){
              if(ble.receivedData[0] == 0x82){
                ble.blocksReceiving = 2;
                ble.receivedData.splice(0, 1);                                   
                break;
              }
              let twobytwo = true;
              if((ble.receivedData[3]& 0x0C) == 0){
                twobytwo = false;
              }
              
              //Make Nicer??
              if (ble.receivedData[0] > 127){
                ble.receivedData[0] -= 256;                             
            }
            if ( ble.receivedData[1] > 127){
              ble.receivedData[1] -= 256;                             
            }
            if ( ble.receivedData[2] > 127){
              ble.receivedData[2] -= 256;                             
            }


              world.addBlock(ble.receivedData[0],ble.receivedData[2],ble.receivedData[1],(ble.receivedData[3]& 0x03),twobytwo,0);
              ble.receivedData.splice(0, 4);  
            }
          }
          if(ble.blocksReceiving == 2 && ble.receivedData.length >6){
            world.setBattery(ble.receivedData[6] * 0.028);
            
         //@   textBattery.setText( "BAT: " + Math.round((ble.receivedData[6] * 0.028)*10)/10 + "V");
          //@  compass.hex[0] = (ble.receivedData[0] << 8) + ble.receivedData[1];
           //@ compass.hex[1] = (ble.receivedData[2] << 8) + ble.receivedData[3];
           //@ compass.hex[2] = (ble.receivedData[4] << 8) + ble.receivedData[5];

           world.compass.x = ble.compassSign((ble.receivedData[0] << 8) + ble.receivedData[1]);
           world.compass.z = ble.compassSign((ble.receivedData[2] << 8) + ble.receivedData[3]);
           world.compass.y = ble.compassSign((ble.receivedData[4] << 8) + ble.receivedData[5]);
           

            ble.blocksReceiving = 0;
            ble.receivedData.splice(0, ble.receivedData.length);  
            world.endAddBlock();
            ble.sendCommand();
            
            return;
          }
        });
      });
    })
    .catch(ble.handleError);
  },

  compassSign : function(val){
    if ( val > 32767){
        return val -= 65536;                             
    }
    return val;
  },

  sendEmptyCommand:  function(){

    console.log("ble sendEmptyCommand");
    clearTimeout(ble.shortTimeOut);
    clearTimeout(ble.timeOut);

    if(!ble.bluetoothDevice.gatt.connected){
      ble.busySend = false;
      Game.close(); 
  
      ble._connectButton.setVisible(0,0, guiOptions.center, guiOptions.center);
      return;
    }

    ble.timeOut = setTimeout(ble.sendEmptyCommand, 3000);

    cmd = new Uint8Array(4);

    cmd[0] = 0x80;
    cmd[1] =  world.base.ledFront + (world.base.ledLeft << 3);
    cmd[2] = world.base.ledBack + (world.base.ledRight << 3);
    cmd[3] = 0x81;

    ble.busySend = true;

    return ble.gattCharacteristic.writeValue(cmd).then(() => {
      ble.busySend = false;
    });

  },

  sendCommand: function() {

    clearTimeout(ble.shortTimeOut);
    if(ble.busySend){
      clearTimeout(ble.shortTimeOut);
      ble.shortTimeOut = setTimeout(ble.sendCommand, 200);
      return;
    }

    clearTimeout(ble.timeOut);
    ble.timeOut = setTimeout(ble.sendEmptyCommand, 3000);

    var cmd;
    let cmd_tmp = [];
    cmd_tmp[0] = 0x80;
    cmd_tmp[1] =  world.base.ledFront + (world.base.ledLeft << 3);
    cmd_tmp[2] = world.base.ledBack + (world.base.ledRight << 3);
    let cmd_pos = 3;

    for(let i =0; i < world.block.length; i++){
      
      //cmd_tmp[cmd_pos] = world.block[i].ledARight + (world.block[i].ledALeft << 3);
      cmd_tmp[cmd_pos] = world.block[i].ledB + (world.block[i].ledA << 3);
      
      if(world.blinkLEDOff){
        if(world.block[i].ledARightBlink){          
          cmd_tmp[cmd_pos] &= 0xF8;
        }
        if(world.block[i].ledALeftBlink){         
          cmd_tmp[cmd_pos] &= 0xC7;
        }
      }   
      cmd_pos++;
    //  if( !world.block[i].twobytwo){
      if( world.block[i] instanceof Block2x4){
       // cmd_tmp[cmd_pos] = world.block[i].ledBRight + (world.block[i].ledBLeft << 3); 
       cmd_tmp[cmd_pos] = world.block[i].ledD + (world.block[i].ledC << 3); 
        if(world.blinkLEDOff){
          if(world.block[i].ledBRightBlink){
            cmd_tmp[cmd_pos] &= 0xF8;
          }
          if(world.block[i].ledBLeftBlink){
            cmd_tmp[cmd_pos] &= 0xC7;
          }
        }   
        cmd_pos++;
      }
    }
    cmd_tmp[cmd_pos] = 0x81;
    cmd_pos++;

    cmd = new Uint8Array(cmd_pos);
    for(let i = 0; i < cmd_pos; i++ ){
        cmd[i] = cmd_tmp[i];
    }

    ble.busySend = true;
    return ble.gattCharacteristic.writeValue(cmd).then(() => {
      ble.busySend = false;

    });
  },

  handleError: function(error) {
    console.log('BLE error=' + error);

  },
  sizeChange: function(size){    
    this._connectButton.changeSize(size);
  }
}