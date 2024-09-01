import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson } from '../models/lesson.model';
import { Student } from '../models/student.model';
import { Exam } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5048/api'; 

  constructor(private http: HttpClient) { }

  getLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/lesson`);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/student`);
  }

  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.apiUrl}/exam`);
  }

  addLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.apiUrl}/lesson`, lesson);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/student`, student);
  }

  addExam(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(`${this.apiUrl}/exam`, exam);
  }

  deleteLesson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/lesson/${id}`);
  }

  deleteStudent(id: number): Observable<void> {
     
    return this.http.delete<void>(`${this.apiUrl}/student/${id}`);
  }

  deleteExam(id: number): Observable<void> {

    return this.http.delete<void>(`${this.apiUrl}/exam/${id}`);
  }

  editStudent(student: Student): Observable<Student> {

    return this.http.put<Student>(`${this.apiUrl}/student`, student);
  }
  editLesson(lesson: Lesson): Observable<Lesson> {
   
    return this.http.put<Lesson>(`${this.apiUrl}/lesson`, lesson);
  }

  editExam(exam: Exam): Observable<Exam> {
  
    return this.http.put<Exam>(`${this.apiUrl}/exam`, exam);
  }
}
