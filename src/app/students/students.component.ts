import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rank, Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  selectedStudent?: Student;

  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
    });
  }

  add(firstName: string, lastName: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    if (!firstName || !lastName) {
      return;
    }

    let rank: Rank = 'white belt';
    let birthdate: string = new Date().toLocaleDateString();

    this.studentService
      .addStudent({ firstName, lastName, rank, birthdate } as Student)
      .subscribe((student) => {
        this.students.push(student);
        this.reload();
      });
  }

  reload(): void {
    let uri = this.router.url;
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
}
