import { Injectable } from "@angular/core";
import { Exercise } from "./excercise.modal";
import { Observable, Subject, Subscription } from "rxjs";

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import "firebase/firestore";
import { map } from "rxjs/operators";
import { error } from "protractor";
import { UIServices } from "../shared/ui-services.service";

@Injectable()
export class TrainingService {
  excerciseChanged = new Subject<Exercise>();
  excercisesChanged = new Subject<Exercise[]>();
  finishedexcercisesChanged = new Subject<Exercise[]>();

  availableExercises: Exercise[] = []; // like squats deadlift ....
  finishedexcercise: Exercise[] = []; // all user exercises(completed or canceled)
  private runningExercise: Exercise; // current exercise

  private exercisesCollection: AngularFirestoreCollection<Exercise>;
  private fbSubs: Subscription[];
  private sub1: Subscription;
  private sub2: Subscription;

  constructor(private db: AngularFirestore, private uiservice: UIServices) {}

  getExercises() {
    this.uiservice.loadingStateChanged.next(true);
    this.exercisesCollection = this.db.collection("availableExercises");
    this.sub1 = this.exercisesCollection
      .snapshotChanges()
      .pipe(
        map(
          (actions) =>
            actions.map((a) => {
              // throw new Error();
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }) // second map for the array
        ) // first map for observable
      )
      .subscribe(
        (exers: Exercise[]) => {
          this.availableExercises = exers;
          console.log(this.availableExercises);
          this.excercisesChanged.next([...this.availableExercises]);
        },
        (error) => {
          this.uiservice.loadingStateChanged.next(false);
          this.uiservice.showMessage("error to load exercices", 3000);
          this.excercisesChanged.next(null);
        }
      );
  }

  startTraining(exerciseId: string) {
    // this.db.doc('availableExercises/'+exerciseId).update({test :'test'});

    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id == exerciseId
    );
    this.excerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.db.collection("fininshedexercises").add({
      ...this.runningExercise,
      date: new Date(),
      state: "completed",
    });
    this.runningExercise = null;
    // no runing exercise
    this.excerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.db.collection("fininshedexercises").add({
      ...this.runningExercise,
      date: new Date(),
      state: "canceled",
      // we will overwrite the duration and calories
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
    });
    this.runningExercise = null;
    // no runing exercise
    this.excerciseChanged.next(null);
    // ;
  }

  getRunningExcercise() {
    return { ...this.runningExercise };
  }

  getCompletedAndCancelledExercises() {
    this.sub2 = this.db
      .collection("fininshedexercises")
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedexcercisesChanged.next(exercises);
      });
  }

  unsub() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
