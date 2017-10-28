import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlePage } from './ble';
import {BLE} from "@ionic-native/ble";

@NgModule({
  declarations: [
    BlePage,
  ],
  imports: [
    IonicPageModule.forChild(BlePage),
  ],
  providers: [
    BLE
  ]
})
export class BlePageModule {}


