import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

/**
 * Generated class for the BluetoothThingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bluetooth-things',
  templateUrl: 'bluetooth-things.html',
})
export class BluetoothThingsPage {

  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  model: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private bluetoothSerial: BluetoothSerial,
              private alertCtrl: AlertController)
  {
    bluetoothSerial.enable();
    this.model = {};
  }

  ionViewDidLoad() {
    this.bluetoothSerial.list().then((successfulPairing) => {
        this.pairedDevices = successfulPairing;
      },
      (err) => {
        console.log(err);
      });
  }

  /* Slide 1 - Find, Connect, Disconnect */
  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;

    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
        this.unpairedDevices = success;
        this.gettingDevices = false;
        success.forEach(element => {
          console.log(element);
        });
      },
      (err) => {
        console.log(err);
      });
  }

  success = (data) => alert(data);
  fail = (error) => alert(error);

  selectDevice(address: any) {
    let alert = this.alertCtrl.create({
      title: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            console.log(address);
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
          }
        }
      ]
    });
    alert.present();

  }

  disconnect() {
    let alert = this.alertCtrl.create({
      title: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    alert.present();
  }

  /* Slide 2 - Turn LED On and OFF */
  turnOn(){
    var ctrl = this;
    this.bluetoothSerial.write('1').then(function (success) {
      console.log(success);
      ctrl.model.ledResponse = success;
    }, function (failure) {
      console.log(failure);
      ctrl.model.ledResponse = failure;
    });
  }

  turnOff(){
    var ctrl = this;
    this.bluetoothSerial.write('0').then(function (success) {
      console.log(success);
      ctrl.model.ledResponse = success;
    }, function (failure) {
      console.log(failure);
      ctrl.model.ledResponse = failure;
    });
  }


  /* Slide 3 - Custom text read and write. */
  readThings(){
    var ctrl = this;
    this.bluetoothSerial.read().then(function (success) {
      console.log(success);
      ctrl.model.readResponse = success;
    }, function (failure) {
      console.log(failure);
      ctrl.model.readResponse = failure;
    });
  }

  writeThings(){
    var ctrl = this;
    this.bluetoothSerial.write(this.model.writeThis).then(function (success) {
      console.log(success);
    }, function (failure) {
      console.log(failure);
    });
  }


  /* Slide 4 */
  util(){
    this.bluetoothSerial.isEnabled().then(function (res) {
      console.log("isEnabled() : " + res);
    });
    this.bluetoothSerial.isConnected().then(function (res) {
      console.log("isConnected() : " + res);
    });
  }

  showSettings(){
    this.bluetoothSerial.showBluetoothSettings();
  }

  listThings(){
    this.bluetoothSerial.list().then(function (data) {
      console.log(data);
    })
  }

  writeThingsExample(){

    // Write a string
    this.bluetoothSerial.write('hello world').then(function (res) {
      console.log(res);
    }, function (res) {
      console.log(res);
    });


    // Array of int or bytes
    // this.bluetoothSerial.write([186, 220, 222]).then(function (res) {
    //   console.log(res);
    // }, function (res) {
    //   console.log(res);
    // });


    // Typed Array
    // var data = new Uint8Array(4);
    // data[0] = 0x41;
    // data[1] = 0x42;
    // data[2] = 0x43;
    // data[3] = 0x44;
    // this.bluetoothSerial.write(data).then(function (res) {
    //   console.log(res);
    // }, function (res) {
    //   console.log(res);
    // });


    // Array Buffer
    // this.bluetoothSerial.write(data.buffer).then(function (res) {
    //   console.log(res);
    // }, function (res) {
    //   console.log(res);
    // });



    // this.bluetoothSerial.write([1]).then(function (success) {
    //   console.log(success);
    // },
    // function (fail) {
    //   console.log(fail);
    // });

  }

}
