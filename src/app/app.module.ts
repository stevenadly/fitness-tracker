import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire";
import { environment } from "./../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";
import { WelcomeComponent } from "./welcome/welcome.component";

import { AuthServiceService } from "./auth/auth-service.service";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TrainingComponent } from "./training/training.component";
import { CurrentTrainingComponent } from "./training/current-training/current-training.component";
import { PastTrainingsComponent } from "./training/past-trainings/past-trainings.component";
import { NewTrainingComponent } from "./training/new-training/new-training.component";
import { TrainingService } from "./training/training.service";
import { StopTrainingComponent } from "./training/current-training/stop-training.component";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AuthGuard } from "./auth/auth-gaurd.model";
import { UIServices } from "./shared/ui-services.service";

import { AuthModule } from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,


    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthServiceService, TrainingService, AuthGuard, UIServices],
  bootstrap: [AppComponent],
})
export class AppModule {}
