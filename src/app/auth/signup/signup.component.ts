import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthServiceService } from "../auth-service.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { UIServices } from "src/app/shared/ui-services.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading: boolean = false;
  loaderSub: Subscription;

  constructor(
    private AuthServiceService: AuthServiceService,
    private uiservices: UIServices
  ) {}

  ngOnInit() {
    this.loaderSub = this.uiservices.loadingStateChanged.subscribe(
      (res: boolean) => {
        this.isLoading = res;
      }
    );
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.AuthServiceService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });

    console.log(form);
  }

  ngOnDestroy() {
    if(this.loaderSub){
      this.loaderSub.unsubscribe();
    }

  }
}
