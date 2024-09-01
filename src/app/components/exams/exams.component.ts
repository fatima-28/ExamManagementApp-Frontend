import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Exam } from '../../models/exam.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
 
})
export class ExamsComponent implements OnInit {
  frm: FormGroup;
  crudStatus : boolean = false;
  crudPopupVisible:boolean = false;

  initializeForm(model: any = {}) {
    this.frm = this.formBuilder.group({     
      date: [model.date || "", [Validators.required, Validators.max(99999999)]],
      studentId: [model.studentId || "", [Validators.required, Validators.max(99999999)]],
      lessonId: [model.lessonId || "", [Validators.required, Validators.max(99999999)]],
      grade: [model.grade || "", [Validators.required, Validators.max(9)]],
      id: [model.id || ""],
      
    });
  }

  exams: any[] = [];
  students: any[] = [];
  lessons: any[] = [];


  get id() {
    return this.frm.get('id')
  }

  get code() {
    return this.frm.get('code')
  }

  get grade() { 
    return this.frm.get('grade')
  }

  get number() {
    return this.frm.get('number')
  }

  get date() {
    return this.frm.get('date')
  }
  get studentId() {
    return this.frm.get('studentId')
  }
  get lessonId() {
    return this.frm.get('lessonId')
  }
  

  constructor(private apiService: ApiService, private formBuilder: FormBuilder,) {
    this.initializeForm();
  }

  
  editExam(data): void {
    this.loadStudents();
    this.loadLessons();
    this.initializeForm(data);
    this.crudPopupVisible = true;
    this.crudStatus = false;
  }
  addExam():void{
    this.loadStudents();
    this.loadLessons();
    this.frm.reset();
    this.crudStatus = true;
    this.crudPopupVisible = true;
  }

  
  submit(){
    console.log(model)
    if (this.frm.valid) {
      var model = {
       
        studentId:this.studentId.value,
        lessonId:this.lessonId.value,
        grade : this.grade.value,    
        date : this.date.value
        
      }

      var editModel = {
        
        studentId:this.studentId.value,
        lessonId:this.lessonId.value,
        grade : this.grade.value,    
        date : this.date.value,
        id : null
      }

      if(this.crudStatus){
        
        this.apiService.addExam(model).subscribe({
          next : data => {
            this.loadExams();
            this.frm.reset();
            this.crudPopupVisible = false;
          },
          error : error =>{
            console.log(error);
            
          }
        });
      }
      else{
        editModel.id = this.id.value;
        this.apiService.editExam(editModel).subscribe({
            next : data => {
                this.loadExams();
                this.frm.reset();
                this.crudPopupVisible = false;
              },
          error : error =>{
            console.log(error);
            
          }
        });
      }

      this.crudPopupVisible=false;
    }
    else{
      this.crudPopupVisible=true;
    }

  }

  ngOnInit(): void {
    this.loadExams();
  }

 
  loadStudents(): void {
    this.apiService.getStudents().subscribe(
      (data: any[]) => {
        this.students = data; 
      },
      error => {
        console.error('Error loading students', error);
      }
    );
  }

  loadLessons(): void {
    this.apiService.getLessons().subscribe(
      (data: any[]) => {
        this.lessons = data; 
      },
      error => {
        console.error('Error loading students', error);
      }
    );
  }


  loadExams(): void {
    this.apiService.getExams().subscribe(
      (data: Exam[]) => {
        this.exams = data;
        
        
      },
      error => {
        console.error('Error loading exams', error);
      }
    );
  }


 
  deleteExam(id: number): void {
    if (confirm('Bu məlumatı silmək istəyirsiniz?')) {
      this.apiService.deleteExam(id).subscribe(
        () => {

           console.log(id);
          this.exams = this.exams.filter(exam => exam.id !== id);
        },
        error => {
          console.error('Error deleting exam', error);
        }
      );
    }
    this.loadExams();
  }

  
}
