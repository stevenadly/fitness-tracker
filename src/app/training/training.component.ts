import { Component, OnInit, OnDestroy } from "@angular/core";
import { TrainingService } from "./training.service";
import { Observable, Subscription } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"],
})
export class TrainingComponent implements OnInit , OnDestroy{
  ongoingTraining = false;
  ongoingTrainingSubscribtion: Subscription;

  constructor(private TrainingService: TrainingService) {}

  // constructor(private TrainingService: TrainingService,firestore: AngularFirestore) {
  //   this.items = firestore.collection('availableExercises').valueChanges();
  //  }
  ngOnInit() {
    this.ongoingTrainingSubscribtion = this.TrainingService.excerciseChanged.subscribe(
      (ex) => {
        if (ex) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );
  }

  ngOnDestroy(){
    if(this.ongoingTrainingSubscribtion){
      this.ongoingTrainingSubscribtion.unsubscribe();
    }
  }


}
