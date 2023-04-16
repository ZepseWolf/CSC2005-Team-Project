import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentstatusRoutingModule } from './equipmentstatus-routing.module';
import { EquipmentstatusComponent } from './equipmentstatus.component';

@NgModule({
  declarations: [EquipmentstatusComponent],
  imports: [
    CommonModule,
    EquipmentstatusRoutingModule
  ]
})
export class EquipmentstatusModule { }
