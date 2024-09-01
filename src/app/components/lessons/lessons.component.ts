import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Lesson } from '../../models/lesson.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  
})
export class LessonsComponent implements OnInit {
 

  
  frm: FormGroup;
  crudStatus : boolean = false;
  crudPopupVisible:boolean = false;

  initializeForm(model: any = {}) {
    this.frm = this.formBuilder.group({
      name: [model.name || "", [Validators.required, Validators.maxLength(30)]],
      class: [model.class || "", [Validators.required, Validators.max(99)]],
      code: [model.code || "", [Validators.required, Validators.max(999)]],
      teacherName: [model.teacherName || "", [Validators.required, Validators.max(20)]],
      teacherSurname: [model.teacherSurname || "", [Validators.required, Validators.max(20)]],
      id: [model.id || ""],
      
    });
  }
  constructor(private apiService: ApiService, private formBuilder: FormBuilder,) {
    this.initializeForm();
  }
 
  lessons: Lesson[] = [];

  get id() {
    return this.frm.get('id')
  }

  get name() {
    return this.frm.get('name')
  }

  get code() { 
    return this.frm.get('code')
  }

  get class() {
    return this.frm.get('class')
  }

  get teacherName() {
    return this.frm.get('teacherName')
  }

  get teacherSurname() {
    return this.frm.get('teacherSurname')
  }
  
  editLesson(data): void {
    this.initializeForm(data);
    this.crudPopupVisible = true;
    this.crudStatus = false;
  }
  addLesson():void{
    this.frm.reset();
    this.crudStatus = true;
    this.crudPopupVisible = true;
  }

  ngOnInit(): void {
    this.loadLessons();
  }

  loadLessons(): void {
    this.apiService.getLessons().subscribe(
      (data: Lesson[]) => {
        this.lessons = data;
        console.log("lessons:");
        console.log(data);
      },
      error => {
        console.error('Error loading lessons', error);
      }
    );
  }



  
  submit(){
    if (this.frm.valid) {
      var model = {
        name : this.name.value,
        class : this.class.value,
        code : this.code.value,
        teacherName : this.teacherName.value,
        teacherSurname : this.teacherSurname.value
        
      }

      var editModel = {
        name : this.name.value,
        class : this.class.value,
        code : this.code.value,
        teacherName : this.teacherName.value,
        teacherSurname : this.teacherSurname.value,
        id : null
      }

      if(this.crudStatus){
        
        this.apiService.addLesson(model).subscribe({
          next : data => {
            this.loadLessons();
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
        this.apiService.editLesson(editModel).subscribe({
            next : data => {
                this.loadLessons();
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

  deleteLesson(id: number): void {
    if (confirm('Bu dərsi silmək istəyirsiniz?')) {
      this.apiService.deleteLesson(id).subscribe(
        () => {
          this.lessons = this.lessons.filter(lesson => lesson.id !== id);
        },
        error => {
          console.error('Error deleting lesson', error);
        }
      );
    }
    this.loadLessons();
  }
}
