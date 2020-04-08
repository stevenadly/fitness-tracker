import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthServiceService } from "../auth-service.service";
import { UIServices } from "src/app/shared/ui-services.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit , OnDestroy{
  loginForm: FormGroup;
  isLoading :boolean = false;
  loaderSub : Subscription;

  constructor(
    private AuthServiceService: AuthServiceService , private uiservices: UIServices) {

    }

  ngOnInit() {
    this.loaderSub = this.uiservices.loadingStateChanged.subscribe((res:boolean) => {
      this.isLoading = res;
    });
    this.loginForm = new FormGroup({
      email: new FormControl("", {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl("", { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.AuthServiceService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
    console.log(this.loginForm);
  }
  ngOnDestroy(){
    if(this.loaderSub){
      this.loaderSub.unsubscribe();
    }
  }
}
