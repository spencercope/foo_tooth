import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToBluetoothThings(): void {
    this.navCtrl.push('BluetoothThingsPage');
  }

  goToBLE(): void {
    this.navCtrl.push('BlePage');
  }
}
