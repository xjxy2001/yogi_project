import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; // Ensure this is imported

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  selectedYear: number = 0;
  selectedInstitute: number = 0;
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;

  years = [
    { id: 0, value: 'Select Year' },
    { id: 1, value: '2023-2024' },
    { id: 2, value: '2024-2025' },
    { id: 3, value: '2025-2026' },
  ];

  traningInstitutes = [
    { id: 0, value: 'Select Training Institute' },
    { id: 1, value: 'RAMETI AMRAVATI' },
    { id: 2, value: 'RAMETI AURANGABAD' },
    { id: 3, value: 'RAMETI KHOPOLI' },
    { id: 4, value: 'RAMETI KHOLAPUR' },
    { id: 5, value: 'RAMETI NAGPUR' },
    { id: 6, value: 'RAMETI NASHIK' },
    { id: 7, value: 'RAMETI PUNE' },
    { id: 8, value: 'ALL' },
  ];
}
