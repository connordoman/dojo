import { Component, OnInit, Input } from '@angular/core';
import { Student, RANKS, Rank } from '../student';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
})
export class StudentDetailComponent implements OnInit {
  ranks: Rank[] = RANKS;

  @Input() student?: Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudent(id).subscribe((student) => {
      this.student = student;
    });
  }

  save(): void {
    if (this.student) {
      this.studentService
        .updateStudent(this.student)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

  delete(): void {
    if (this.student) {
      this.studentService
        .deleteStudent(this.student.id)
        .subscribe(() => this.goBack());
    }
  }

  titleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  }
}
