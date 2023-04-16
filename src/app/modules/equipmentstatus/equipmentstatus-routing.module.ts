import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EquipmentstatusComponent } from './equipmentstatus.component';

const routes: Routes = [{
    path: "",
    component: EquipmentstatusComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentstatusRoutingModule { }
