
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { LessonsComponent } from './components/lessons/lessons.component';
 import { StudentsComponent } from './components/students/students.component';
 import { ExamsComponent } from './components/exams/exams.component';

const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'exams', component: ExamsComponent },
  { path: 'lessons', component: LessonsComponent },
  { path: '**', redirectTo: 'students' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
