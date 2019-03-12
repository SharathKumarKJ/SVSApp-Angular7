import { Student } from '../student/student.model';

export class Attendance {
    Id: number;
    Student: Student;
    AttendanceDate: Date;
    IsPresent: boolean;
    IsActive: boolean;
}