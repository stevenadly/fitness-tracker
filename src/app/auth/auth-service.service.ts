import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import * as firebase from "firebase/app";
import { TrainingService } from "./../training/training.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIServices } from '../shared/ui-services.service';

@Injectable()
export class AuthServiceService {
  // the app user
  // private user: User;
  private isThereUser: boolean;
  authChange = new Subject<boolean>();

  constructor(
    private Router: Router,
    private AngularFireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private _snackBar: MatSnackBar,
    private uiservices: UIServices
  ) {}

  initAuthListner() {
    ;
    this.AngularFireAuth.authState.subscribe(user => {
      if (user) {
        // auth successsfuly
        this.isThereUser = true;
        this.authChange.next(true);
        this.Router.navigate(["/training2"]);
      } else {
        // logout
        ;
        // this.trainingService.unsub();
        this.isThereUser = false;
        this.authChange.next(false);
        this.Router.navigate(["/login"]);
      }
    });
  }

  registerUser(authdata: AuthData) {
     this.uiservices.loadingStateChanged.next(true);
    this.AngularFireAuth.createUserWithEmailAndPassword(
      authdata.email,
      authdata.password
    )
      .then(result => {
        this.uiservices.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.uiservices.loadingStateChanged.next(false);
       this.uiservices.showMessage(error.message , 3000);
      });

    // this.user = {
    //   email: authdata.email,
    //   userId: Math.round(Math.random() * 1000).toString()
    // };
    // this.authSuccessfully();
  }

  login(authdata: AuthData) {
    this.uiservices.loadingStateChanged.next(true);
    this.AngularFireAuth.signInWithEmailAndPassword(
      authdata.email,
      authdata.password
    )
      .then(result => {
        this.uiservices.loadingStateChanged.next(false);
        window.alert("You have been successfully login!");
        console.log(result.user);
      })
      .catch(error => {
        this.uiservices.loadingStateChanged.next(false);
        this._snackBar.open(error.message, ' ', {
          duration: 3000,
        });
        this.uiservices.showMessage(error.message , 3000);

      });
  }

  logout() {
    this.trainingService.unsub();
    this.AngularFireAuth.signOut();
  }

  isAuth() {
    return this.isThereUser;
  }
}
