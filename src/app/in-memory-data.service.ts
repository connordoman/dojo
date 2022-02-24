import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  createDb() {
    const students = [
      { id: 11, firstName: 'Dan', lastName: 'Nicholson' },
      { id: 12, firstName: 'Sabrina', lastName: 'Bliem' },
      { id: 13, firstName: 'Connor', lastName: 'Doman' },
      { id: 14, firstName: 'Josh', lastName: 'Rychtowski' },
      { id: 15, firstName: 'Kristina', lastName: 'Pham' },
      { id: 16, firstName: 'Katelyn', lastName: 'Wiebe' },
      { id: 17, firstName: 'Jesse', lastName: 'Enkamp' },
      { id: 18, firstName: 'Damien', lastName: 'Quintero' },
    ];
    return { students };
  }

  genId(students: Student[]): number {
    return students.length > 0
      ? Math.max(...students.map((student) => student.id)) + 1
      : 11;
  }
}
