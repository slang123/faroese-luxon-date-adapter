import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FO_DATE_FORMATS } from '@slang123/faroese-date-adapter';
import { DateTime } from 'luxon';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [MatDatepickerModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatInputModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  hint = FO_DATE_FORMATS.display.dateInput;
  date = new FormControl(DateTime.now());
}
