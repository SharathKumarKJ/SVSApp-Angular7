import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule, MatSelectModule, MatRadioModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTreeModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserService } from './shared/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { FormFieldComponent } from './form-field/form-field.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TreeComponent } from './tree/tree.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StudentComponent } from './student/student.component';
import { BrowseStudentComponent } from './browse-student/browse-student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { BrowseTeacherComponent } from './browse-teacher/browse-teacher.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { BrowseClassesComponent } from './browse-classes/browse-classes.component';
import { SubjectComponent } from './subject/subject.component';
import { BrowseSubjectComponent } from './browse-subject/browse-subject.component';
import { TeacherSubjectDetailComponent } from './teacher-subject-detail/teacher-subject-detail.component';
import { BrowseTeacherSubjectDetailComponent } from './browse-teacher-subject-detail/browse-teacher-subject-detail.component';
import { FeeDetailComponent } from './fee-detail/fee-detail.component';
import { BrowseFeeDetailComponent } from './browse-fee-detail/browse-fee-detail.component';
import { BrowseUserComponent } from './browse-user/browse-user.component';
import { ToastrModule } from 'ngx-toastr';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import 'flatpickr/dist/flatpickr.css';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SampleComponent } from './sample/sample.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { StudentListComponent } from './student-list/student-list.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherViewComponent } from './teacher-view/teacher-view.component';
import { FeeDetailListComponent } from './fee-detail-list/fee-detail-list.component';
import { FeeDetailViewComponent } from './fee-detail-view/fee-detail-view.component';
import { ExportAsModule } from 'ngx-export-as';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StudentAttendanceListComponent } from './student-attendance-list/student-attendance-list.component';
import { StudentMarksComponent } from './student-marks/student-marks.component';
import { StudentMarksDialogComponent } from './student-marks/student-marks-dialog/student-marks-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    SignInComponent,
    UserComponent,
    SignUpComponent,
    FormFieldComponent,

    DashboardComponent,
    TreeComponent,
    DragDropComponent,
    StudentComponent,
    BrowseStudentComponent,
    TeacherComponent,
    BrowseTeacherComponent,
    ClassDetailComponent,
    BrowseClassesComponent,
    SubjectComponent,
    BrowseSubjectComponent,
    TeacherSubjectDetailComponent,
    BrowseTeacherSubjectDetailComponent,
    FeeDetailComponent,
    BrowseFeeDetailComponent,
    BrowseUserComponent,
    PhotoGalleryComponent,
    CalendarComponent,
    SampleComponent,
    StudentViewComponent,
    StudentListComponent,
    TeacherListComponent,
    TeacherViewComponent,
    FeeDetailListComponent,
    FeeDetailViewComponent,
    StudentAttendanceComponent,
    StudentAttendanceListComponent,
    StudentMarksComponent,
    StudentMarksDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NgbModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatMenuModule,
    MatTreeModule,
    DragDropModule,
    NgxGalleryModule,
    NgbModalModule,
    CommonModule,
    ExportAsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ToastrModule.forRoot()
  ],
  providers: [UserService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true

    }],
    entryComponents: [StudentMarksComponent, StudentMarksDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
