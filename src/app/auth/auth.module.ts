import { NgModule } from "@angular/core";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";

import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { SharedModule } from "../shared/shared.module";
import { AuthRouting } from "./auth-rounting.module";
// import { AuthModule } from '../auth.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AuthRouting,
  ],
})
export class AuthModule {}
