import { Injectable } from '@angular/core';
import { Student } from './student';
import { STUDENTS } from './mock-students';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentsUrl = 'api/students';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl).pipe(
      tap((_) => this.log('fetched students')),
      catchError(this.handleError<Student[]>('getStudents', []))
    );
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      tap((_) => this.log(`fetched student with id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  updateStudent(student: Student): Observable<any> {
    return this.http.put(this.studentsUrl, student, this.httpOptions).pipe(
      tap((_) => this.log(`udpated student with id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  addStudent(student: Student): Observable<Student> {
    return this.http
      .post<Student>(this.studentsUrl, student, this.httpOptions)
      .pipe(
        tap((newStudent: Student) => {
          this.log(`added student with id=${newStudent.id}`);
        }, catchError(this.handleError<Student>('addStudent')))
      );
  }

  deleteStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;

    return this.http.delete<Student>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  searchStudents(term: string): Observable<Student[]> {
    if (!term.trim()) {
      return of([]);
    }
    // account for not entering last names
    let fN: string = '',
      lN: string = '',
      split: string[];
    split = term.split(' ');
    fN = split[0];
    if ((split = split.slice(1, split.length - 1)).length > 0) {
      lN = '';
      split.forEach((e) => {
        lN += `${e} `;
      });
    }
    return this.http
      .get<Student[]>(`${this.studentsUrl}/?firstName=${fN}&lastName=${lN}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found students matching "${term}"`)
            : this.log(`no students matching "${term}"`)
        ),
        catchError(this.handleError<Student[]>('searchStudents', []))
      );
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

  private log(message: string) {
    this.messageService.add(`StudentService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
