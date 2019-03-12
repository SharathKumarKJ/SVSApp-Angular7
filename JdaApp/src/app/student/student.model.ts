import { Class } from "../class-detail/class.model";

export class Student {
    Id: number;
    FirstName: string;
    LastName: string;
    FatherName: string;
    MotherName: string;
    FatherMobileNumber: string;
    MotherMobileNumber: string;
    STSCode: string;
    CasteName: string;
    DateofBirth: any;
    ClassDetail: Class;
    Address1: string;
    Address2: string;
    City: string;
    State: string;
    PostalCode: string;
    Gender: string;
    Nationality: string;
    IsActive:boolean;
}