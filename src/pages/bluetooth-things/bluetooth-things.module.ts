import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BluetoothThingsPage } from './bluetooth-things';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@NgModule({
  declarations: [
    BluetoothThingsPage,
  ],
  imports: [
    IonicPageModule.forChild(BluetoothThingsPage)
  ],
  providers: [
    BluetoothSerial
  ]
})
export class BluetoothThingsPageModule {}
