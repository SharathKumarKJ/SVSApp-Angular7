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

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] ,
  children: [{ path: '', component: DashboardComponent }]},

  {
    path: 'navigation', component: NavigationComponent, canActivate: [AuthGuard]
   
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
    path: 'student', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: StudentComponent }]
  },

  {
    path: 'browseStudent', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: BrowseStudentComponent }]
  },

  {
    path: 'teacher', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: TeacherComponent }]
  },

  {
    path: 'browseTeacher', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: BrowseTeacherComponent }]
  },

  {
    path: 'subject', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: SubjectComponent }]
  },

  {
    path: 'browseSubject', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: BrowseSubjectComponent }]
  },

  {
    path: 'class', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: ClassDetailComponent }]
  },

  {
    path: 'browseClass', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: BrowseClassesComponent }]
  },

  {
    path: 'fee', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: FeeDetailComponent }]
  },

  {
    path: 'browseFee', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: BrowseFeeDetailComponent }]
  },

  {
    path: 'teacherSubjectDetail', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: TeacherSubjectDetailComponent }]
  },

  {
    path: 'browseTeacherSubjectDetail', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: BrowseTeacherSubjectDetailComponent }]
  },

  {
    path: 'browseUser', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: BrowseUserComponent }]
  },
  {
    path: 'dashBoard', component: NavigationComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: DashboardComponent }]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {


}
