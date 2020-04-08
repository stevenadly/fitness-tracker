import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: number;
  steps: number;

  constructor(private dialog: MatDialog, private TrainingService: TrainingService) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.steps = this.TrainingService.getRunningExcercise().duration / 100 * 1000;
    this.timer = +setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        // if reach progress became 100 which means done
        this.TrainingService.completeExercise();

        clearInterval(this.timer);
      }
    }, this.steps);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.trainingExit.emit();
        this.TrainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

}
