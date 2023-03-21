import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.scss']
})
export class StudentAddEditComponent implements OnInit{

  Department: String[] = [
    'Mechanical', 'Civil', 'ECE', 'EEE', 'CSE'
  ]

  College: String[] = [
    "Andhra University", 'JNTUK', 'JNTUH', 'JNTUA', 'SVU', 'NIT', 'IIT'
  ]
  studentForm: FormGroup;

  constructor(private _fb: FormBuilder, private _studentservice: StudentService, 
    private _Matdialogref: MatDialogRef<StudentAddEditComponent>,@Inject(MAT_DIALOG_DATA) public data:any
    
    ) {
    this.studentForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      department: '',
      college: '',
      address: '',
      city: ''
    });
  }

  ngOnInit(): void {
    this.studentForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.studentForm.valid) {

      if(this.data){
        this._studentservice.updateStudent(this.data.id ,this.studentForm.value)
        .subscribe({
          next: (val: any) => {
            alert('student detials updated');
            this._Matdialogref.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        })

      } else{
        this._studentservice.addStudent(this.studentForm.value).subscribe({
          next: (val: any) => {
            alert('student detials updated');
            this._Matdialogref.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        })

      }

    }
  }

}
