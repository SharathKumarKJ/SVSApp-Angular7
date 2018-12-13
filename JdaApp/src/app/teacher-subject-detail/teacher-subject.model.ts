import { Class } from "../class-detail/class.model";
import { Subject } from "../subject/subject.model";
import { Teacher } from "../teacher/teacher.model";

export class TeacherSubject {
    Id: number;
    Teacher: Teacher
    Subject: Subject
    ClassDetail: Class;
    IsActive: boolean;
}