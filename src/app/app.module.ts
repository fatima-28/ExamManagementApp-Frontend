

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import { ExamsComponent } from './components/exams/exams.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    ExamsComponent,
    LessonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

