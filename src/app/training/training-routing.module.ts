import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';


let traingingRoutes :Routes=[
    // , canActivate: [AuthGuard]
    { path: '', component: TrainingComponent }

]
@NgModule({
  imports:[RouterModule.forChild(traingingRoutes)],
  exports:[RouterModule],
  // providers:[AuthGuard]

})
export class TraingRouting{

}
