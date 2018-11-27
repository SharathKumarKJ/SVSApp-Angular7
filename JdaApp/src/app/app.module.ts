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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserService } from './shared/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { FormFieldComponent } from './form-field/form-field.component';
import { TableComponent } from './table/table.component';
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

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    SignInComponent,
    UserComponent,
    SignUpComponent,
    FormFieldComponent,
    TableComponent,
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
    BrowseUserComponent
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
    DragDropModule
  ],
  providers: [UserService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true

    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
