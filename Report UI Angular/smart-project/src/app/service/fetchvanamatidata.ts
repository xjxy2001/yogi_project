import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class Fetchvanamatidata {
  private apiUrl = 'https://vanamati.in/api.php';
  private apiKey = 'vanamati_smart';
  private excelPath = '/vanamati_training_data.xlsx'; // public folder

  constructor(private http: HttpClient) {}

  getData(params: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.apiKey,
    });
    return this.http
      .get(this.apiUrl, { params, headers })
      .pipe(catchError(() => this.getExcelData()));
  }

  private getExcelData(): Observable<any> {
    return new Observable((observer) => {
      fetch(this.excelPath)
        .then((res) => res.arrayBuffer())
        .then((buffer) => {
          const workbook = XLSX.read(buffer, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          observer.next(data);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
  }
}
