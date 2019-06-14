import { Class } from "../class-detail/class.model";
import { Student } from '../student/student.model';
import { Subject } from '../subject/subject.model';


export class StudentMarks {
    Id: number;
    Student: Student;
    Subject: Subject;
    ClassDetail: Class;
    ExamType: string;
    ResultStatus: string;
    TotalMarks: number;
    MarksObtained: number;
    Grade: string;
    IsActive: boolean;
}


export class StudentmarksParams {
    StudentId: number;
    ClassId: number;
}