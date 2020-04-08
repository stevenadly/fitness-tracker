import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { SharedModule } from "../shared/shared.module";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { TraingRouting } from './training-routing.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    PastTrainingsComponent,
    NewTrainingComponent,
    StopTrainingComponent,
  ],
  imports: [AngularFirestoreModule, SharedModule,TraingRouting ],
  entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}
