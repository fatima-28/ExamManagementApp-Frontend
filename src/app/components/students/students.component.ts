import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Student } from '../../models/student.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  
})
export class StudentsComponent implements OnInit {
  frm: FormGroup;
  crudStatus : boolean = false;
  crudPopupVisible:boolean = false;

  initializeForm(model: any = {}) {
    this.frm = this.formBuilder.group({
      name: [model.name || "", [Validators.required, Validators.maxLength(30)]],
      surname: [model.surname || "", [Validators.required, Validators.max(30)]],
      number: [model.number || "", [Validators.required, Validators.max(99999)]],
      class: [model.class || "", [Validators.required, Validators.max(99)]],
      id: [model.id || ""],
      
    });
  }

  students: Student[] = [];

  get id() {
    return this.frm.get('id')
  }

  get name() {
    return this.frm.get('name')
  }

  get surname() { 
    return this.frm.get('surname')
  }

  get number() {
    return this.frm.get('number')
  }

  get class() {
    return this.frm.get('class')
  }
  

  constructor(private apiService: ApiService, private formBuilder: FormBuilder,) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.apiService.getStudents().subscribe(
      (data: Student[]) => {
        this.students = data;
        console.log("students");
        console.log(data);
      },
      error => {
        console.error('Error loading students', error);
      }
      
    );
  }

  
  editStudent(data): void {
    this.initializeForm(data);
    this.crudPopupVisible = true;
    this.crudStatus = false;
  }
  addStudent():void{
    this.frm.reset();
    this.crudStatus = true;
    this.crudPopupVisible = true;
  }

  deleteStudent(id: number): void {
    if (confirm('Bu şagirdi silmək istəyirsiniz?')) {
      this.apiService.deleteStudent(id).subscribe(
        () => {
          this.students = this.students.filter(student => student.id !== id);
        },
        error => {
          console.error('Error deleting student', error);
        }
      );
    }
    this.loadStudents();
  }

  submit(){
    if (this.frm.valid) {
      var model = {
        name : this.name.value,
        class : this.class.value,
        number : this.number.value,
        surname : this.surname.value
        
      }

      var editModel = {
        name : this.name.value,
        class : this.class.value,
        number : this.number.value,
        surname : this.surname.value,
        id : null
      }

      if(this.crudStatus){
        
        this.apiService.addStudent(model).subscribe({
          next : data => {
            this.loadStudents();
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
        this.apiService.editStudent(editModel).subscribe({
            next : data => {
                this.loadStudents();
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
}
