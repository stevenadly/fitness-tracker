import { Subject } from "rxjs";
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UIServices {
  loadingStateChanged = new Subject<boolean>();

  constructor(private _snackBar: MatSnackBar){}

  showMessage(message : string ,duration:number , action =''){
    this._snackBar.open(message, action , {
      duration:duration ,
    });
  }
}
