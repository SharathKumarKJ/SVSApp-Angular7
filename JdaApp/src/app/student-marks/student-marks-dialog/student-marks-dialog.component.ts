import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StudentMarks } from '../StudentMarks.model';

@Component({
  selector: 'app-student-marks-dialog',
  templateUrl: './student-marks-dialog.component.html',
  styleUrls: ['./student-marks-dialog.component.scss']
})
export class StudentMarksDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<StudentMarksDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: StudentMarks) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
