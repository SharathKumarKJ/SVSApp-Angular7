import { Student } from "../student/student.model";

export class Fee
{
    Id :number
    Student:Student
    DueDate:Date
    PaidDate:Date
    TotalAmount:number
    PaidAmount:number
    BalanceAmount:number
    FeeStatus:number
    IsActive:boolean
}