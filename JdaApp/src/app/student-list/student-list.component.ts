import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../student/student.model';
import { StudentService } from '../shared/student.service';
import { Class } from '../class-detail/class.model';
import { ClassDetailService } from '../shared/class-detail.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students: Student[];
  filterdStudent: Student[];
  employeeToDisplay: Student;
  private arrayIndex: 1;
  dataFromChild: Student;
  private _searchTerm: string;
  classDetails: Class[];

  className: string;

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterdStudent = this.filterdStudents(value);
  }
  constructor(private studentService: StudentService
    , private _router: Router
    , private _route: ActivatedRoute
    , private classService: ClassDetailService) { }

  ngOnInit() {
    this.GetClasses();
  }

  private GetStudentsByClass(classId :number) {
    this.studentService.GetStudentsByClass(classId).subscribe((x) => {
      this.students = x;
      if (this._route.snapshot.queryParamMap.has('searchTerm')) {
        this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
      }
      else {
        this.employeeToDisplay = this.students[0];
        this.filterdStudent = this.students;
      }
    });
  }

  private GetClasses() {
    this.classService.getClasses().subscribe((data: any) => {
      this.classDetails = data;
    }, (error: any) => { });
  }

  filterdStudents(searchTerm: string): Student[] {
    return this.students.filter(x => x.FirstName.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) != -1)

  }
  nextStudent(): void {
    if (this.arrayIndex <= 2) {
      this.employeeToDisplay = this.students[this.arrayIndex];
      this.arrayIndex++;
    }
    else {
      this.employeeToDisplay = this.students[0];
      this.arrayIndex = 1;
    }
  }

  handleNotify(eventData: Student) {
    this.dataFromChild = eventData;
  }


  viewStudents(classId: number) {
    this.GetStudentsByClass(classId);
  }
  onClick(studentId: number) {

    this._router.navigate(
      ['/student', studentId]
      , { queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testvalue' } }
    );

  }


}
