import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { FormFieldComponent } from './form-field/form-field.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { TreeComponent } from './tree/tree.component';
import { StudentComponent } from './student/student.component';
import { BrowseStudentComponent } from './browse-student/browse-student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { BrowseTeacherComponent } from './browse-teacher/browse-teacher.component';
import { SubjectComponent } from './subject/subject.component';
import { BrowseSubjectComponent } from './browse-subject/browse-subject.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { BrowseClassesComponent } from './browse-classes/browse-classes.component';
import { FeeDetailComponent } from './fee-detail/fee-detail.component';
import { BrowseFeeDetailComponent } from './browse-fee-detail/browse-fee-detail.component';
import { TeacherSubjectDetailComponent } from './teacher-subject-detail/teacher-subject-detail.component';
import { BrowseTeacherSubjectDetailComponent } from './browse-teacher-subject-detail/browse-teacher-subject-detail.component';
import { BrowseUserComponent } from './browse-user/browse-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { CalendarComponent } from './calendar/calendar.component';
import { StudentListComponent } from './student-list/student-list.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { FeeDetailListComponent } from './fee-detail-list/fee-detail-list.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { StudentAttendanceListComponent } from './student-attendance-list/student-attendance-list.component';

const routes: Routes = [

  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },

  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },

  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },

  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['Admin','SecurityAdmin','Teacher','Student'] },
    children: [{ path: '', component: DashboardComponent }]
  },

  {
    path: 'navigation', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin','Teacher','Student'] },

  },

  {
    path: 'shipping', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: FormFieldComponent }]
  },



  {
    path: 'myWork', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: DragDropComponent }]
  },

  {
    path: 'myFolder', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: TreeComponent }]
  },

  {
    path: 'student', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin','Teacher'] },
    children: [{ path: '', component: StudentComponent }]
  },
  {
    path: 'student/:Id', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin','Teacher'] },
    children: [{ path: '', component: StudentComponent }]
  },
  {
    path: 'browseStudent', component: NavigationComponent, canActivate: [AuthGuard], data: { roles: ['Admin','SecurityAdmin','Teacher'] },
    children: [{ path: '', component: BrowseStudentComponent }]
  },
  {
    path: 'studentAttendance', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin','Teacher'] },
    children: [{ path: '', component: StudentAttendanceComponent }]
  },

  {
    path: 'AttendanceList', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin','Teacher'] },
    children: [{ path: '', component: StudentAttendanceListComponent }]
  },
  {
    path: 'listStudent', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin','Teacher'] },
    children: [{ path: '', component: StudentListComponent }]
  },

  {
    path: 'teacher', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin',] },
    children: [{ path: '', component: TeacherComponent }]
  },

  {
    path: 'browseTeacher', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin'] },
    children: [{ path: '', component: BrowseTeacherComponent }]
  },

  {
    path: 'listTeacher', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin'] },
    children: [{ path: '', component: TeacherListComponent }]
  },

  {
    path: 'subject', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin','Teacher'] },
    children: [{ path: '', component: SubjectComponent }]
  },

  {
    path: 'browseSubject', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin','Teacher'] },
    children: [{ path: '', component: BrowseSubjectComponent }]
  },

  {
    path: 'class', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin'] },
    children: [{ path: '', component: ClassDetailComponent }]
  },

  {
    path: 'browseClass', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin'] },
    children: [{ path: '', component: BrowseClassesComponent }]
  },

  {
    path: 'fee', component: NavigationComponent, canActivate: [AuthGuard], data: { roles: ['Admin','SecurityAdmin'] },
    children: [{ path: '', component: FeeDetailComponent }]
  },

  {
    path: 'browseFee', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin'] },
    children: [{ path: '', component: BrowseFeeDetailComponent }]
  },
  {
    path: 'listFee', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin'] },
    children: [{ path: '', component: FeeDetailListComponent }]
  },

  {
    path: 'teacherSubjectDetail', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin','Teacher'] },
    children: [{ path: '', component: TeacherSubjectDetailComponent }]
  },

  {
    path: 'browseTeacherSubjectDetail', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin','Teacher'] },
    children: [{ path: '', component: BrowseTeacherSubjectDetailComponent }]
  },

  {
    path: 'browseUser', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: BrowseUserComponent }]
  },
  {
    path: 'dashBoard', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin','Teacher','Student'] },
    children: [{ path: '', component: DashboardComponent }]
  },
  {
    path: 'photo', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin','Teacher','Student'] },
    children: [{ path: '', component: PhotoGalleryComponent }]
  },
  {
    path: 'calendar', component: NavigationComponent, canActivate: [AuthGuard],data: { roles: ['Admin','SecurityAdmin','Teacher','Student'] },
    children: [{ path: '', component: CalendarComponent }]
  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {


}
