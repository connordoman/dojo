import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  selectedStudent?: Student;

  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService
      .getStudents()
      .subscribe((students) => (this.students = students));
  }

  add(firstName: string, lastName: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    if (!firstName || !lastName) {
      return;
    }

    this.studentService
      .addStudent({ firstName, lastName } as Student)
      .subscribe((student) => {
        this.students.push(student);
      });
  }

  delete(student: Student): void {
    this.students = this.students.filter((s) => s !== student);
    this.studentService.deleteStudent(student.id).subscribe();
  }
}
