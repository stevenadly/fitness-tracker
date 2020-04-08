import { Component, OnInit, OnDestroy } from "@angular/core";
import { Exercise } from "../excercise.modal";
import { TrainingService } from "../training.service";
import { NgForm } from "@angular/forms";

import "firebase/firestore";
import { Subscription } from "rxjs";
import { UIServices } from "src/app/shared/ui-services.service";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[];
  //  exss : Exercise[];
  exerciseSubscription: Subscription;
  isLoading: boolean;
  loadingSub: Subscription;

  constructor(
    private TrainingService: TrainingService,
    private uiservice: UIServices
  ) {}

  ngOnInit() {
    // ;
    // this.exercises = this.db.collection('availableExercises').valueChanges();
    this.loadingSub = this.uiservice.loadingStateChanged.subscribe(
      isloading => {
        this.isLoading = isloading;
      }
    );

    this.exerciseSubscription = this.TrainingService.excercisesChanged.subscribe(
      exercices => {
        this.exercises = exercices;
      }
    );
    this.fetchAllExercises();
  }

  fetchAllExercises() {
    this.TrainingService.getExercises();
  }
  ngOnDestroy() {
    if(this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe();
    }
  }

  onStartTraining(form: NgForm) {
    console.log(form.value.exercise);
    this.TrainingService.startTraining(form.value.exercise);
  }
}
