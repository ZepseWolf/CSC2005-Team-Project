import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CalendarModule } from './modules/calendar/calendar.module';
import { HomeModule } from './modules/home/home.module';

// Modules
import { LoginModule } from './modules/login/login.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ProfileModule } from './modules/profile/profile.module';
import { EquipmentstatusModule } from './modules/equipmentstatus/equipmentstatus.module';

const routes: Routes = [
  {path: '' , redirectTo: 'login' , pathMatch: 'full' },
  {
    path: 'login',
    loadChildren:() => LoginModule
  },{
    path: 'home',
    loadChildren:() => HomeModule
  },{
    path: 'profile',
    loadChildren:() => ProfileModule
  },{
    path: 'calendar',
    loadChildren:() => CalendarModule
  },
  {
    path: 'equipmentstatus', loadChildren:() =>  EquipmentstatusModule
  },
  {
    path: 'inventory',
    loadChildren:() => InventoryModule
  },
  {
    path: '**' , redirectTo: 'login' , pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
