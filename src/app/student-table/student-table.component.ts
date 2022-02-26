import { Component, OnInit, Attribute } from '@angular/core';

import { Student, Rank } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css'],
})
export class StudentTableComponent implements OnInit {
  selectedStudent?: Student;

  students: Student[] = [];

  constructor(
    @Attribute('delible') public delible: boolean,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
    });
  }

  getAge(student: Student): number {
    let today = new Date();
    let birthday = new Date(student.birthdate);
    let age = today.getFullYear() - birthday.getFullYear();
    let m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
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
