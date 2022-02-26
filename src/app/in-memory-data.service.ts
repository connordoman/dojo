import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from './student';
import { STUDENTS } from './mock-students';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  createDb() {
    const students = STUDENTS;
    return { students };
  }

  genId(students: Student[]): number {
    return students.length > 0
      ? Math.max(...students.map((student) => student.id)) + 1
      : 11;
  }
}
