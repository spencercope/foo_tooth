import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {BLE} from "@ionic-native/ble";


/**
 * Generated class for the BlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ble',
  templateUrl: 'ble.html',
})
export class BlePage {

  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  model: any;
  bleModuleMAC: string;

  constructor(public navCtrl: NavController, private ble: BLE, private alertCtrl: AlertController, public navParams: NavParams) {
    this.bleModuleMAC = 'D4:36:39:DE:60:6F';
  }

  ionViewDidLoad() {
    this.ble.scan([], 5)
      .subscribe(data => {
        this.ble.connect(this.bleModuleMAC)
          .subscribe(success => {
              console.log(success);
            },
            error => {
              console.log(error);
            });
      }, error => {
        console.log(error);
      });
  }

  /* Slide 1 - Find, Connect, Disconnect */
  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;

    this.gettingDevices = true;
    this.ble.scan([],20)
      .subscribe((success) => {
        console.log(success);
        this.unpairedDevices = success;
        this.gettingDevices = false;
        // success.forEach(element => {
        //   console.log(element);
        // });
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
            this.ble.connect(address).subscribe(this.success, this.fail);
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
            //this.ble.disconnect();
          }
        }
      ]
    });
    alert.present();
  }

}
