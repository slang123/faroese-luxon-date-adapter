import { Injectable, Provider } from '@angular/core';
import { LuxonDateAdapter, provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { DateTime } from 'luxon';


export const FAROESE_MONTH_NAMES = [
    'januar', 'februar', 'mars', 'apríl', 'mai', 'juni',
    'juli', 'august', 'september', 'oktober', 'november', 'desember'
];
export const FAROESE_MONTH_NAMES_SHORT = [
    'jan', 'feb', 'mar', 'apr', 'mai', 'jun',
    'jul', 'aug', 'sep', 'okt', 'nov', 'des'
];
export const FAROESE_MONTH_NAMES_NARROW = [
    'j', 'f', 'm', 'a', 'm', 'j',
    'j', 'a', 's', 'o', 'n', 'd'
];

export const FAROESE_DAY_NAMES = [
    'sunnudagur', 'mánadagur', 'týsdagur', 'mikudagur', 'hósdagur', 'fríggjadagur', 'leygardagur'
];
export const FAROESE_DAY_NAMES_SHORT = [
    'sun', 'mán', 'týs', 'mik', 'hós', 'frí', 'ley'
];
export const FAROESE_DAY_NAMES_NARROW = [
    'S', 'M', 'T', 'M', 'H', 'F', 'L'
];

export const FO_DATE_FORMATS = {
    parse: {
        dateInput: 'ddMMyyyy',
        timeInput: 'HHmm',
    },
    display: {
        dateInput: 'dd.MM.yyyy',
        monthLabel: 'MMM',
        monthYearLabel: 'MMMM yyyy',
        dateA11yLabel: 'll',
        monthYearA11yLabel: 'MMMM yyyy',
        dayLabel: 'd',
        dayA11yLabel: 'EEEE',
        dateAndTimeLabel: 'dd.MM.yyyy HH:mm',
        timeOptionLabel: 'HH:mm',
        timeInput: 'HH:mm',
    },
};

@Injectable({ providedIn: 'root' })
export class FaroeseDateAdapter extends LuxonDateAdapter {


    constructor() {
        super('fo', {
            firstDayOfWeek: 1, useUtc: true, defaultOutputCalendar: 'gregory'
        });
    }

    override parse(value: any, parseFormat?: string | string[]): DateTime | null {
        if (typeof value === 'string' && /^\d{4}$/.test(value)) {
          // Parse shorthand time input (e.g., 1130 -> 11:30)
          const hours = parseInt(value.substring(0, 2), 10);
          const minutes = parseInt(value.substring(2, 4), 10);
    
          if (hours < 24 && minutes < 60) {
            return DateTime.now().set({ hour: hours, minute: minutes });
          }
        }
    
        // Fallback to the default behavior
        return super.parse(value, parseFormat || 'ddMMyyyy');
      }


      override deserialize(value: any): DateTime | null {
        if (typeof value === 'string' && /^\d{4}$/.test(value)) {
          // Parse time in HHmm format
          const hours = parseInt(value.substring(0, 2), 10);
          const minutes = parseInt(value.substring(2, 4), 10);
    
          if (hours < 24 && minutes < 60) {
            return DateTime.now().set({ hour: hours, minute: minutes });
          }
        }
    
        return super.deserialize(value);
      }


    override getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        switch (style) {
            case 'long':
                return FAROESE_MONTH_NAMES;
            case 'short':
                return FAROESE_MONTH_NAMES_SHORT;
            case 'narrow':
                return FAROESE_MONTH_NAMES_NARROW;
            default:
                throw new Error(`Invalid style: ${style}`);

        }
    }


    override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        switch (style) {
            case 'long':
                return FAROESE_DAY_NAMES;
            case 'short':
                return FAROESE_DAY_NAMES_SHORT;
            case 'narrow':
                return FAROESE_DAY_NAMES_NARROW;
            default:
                throw new Error(`Invalid style: ${style}`);

        }
    }

    override getFirstDayOfWeek(): number {
        return 1;
    }

    override format(date: DateTime, displayFormat: string): string {
        if (displayFormat === 'MMMM yyyy') {
            const monthIndex = date.month - 1; // Luxon months are 1-indexed
            const faroeseMonthName = FAROESE_MONTH_NAMES[monthIndex];
            return `${faroeseMonthName} ${date.year}`;
        }

        return super.format(date, displayFormat);
    }

}

export function provideFaroeseDateAdapter(): Provider[] {
    return [
        provideNativeDateAdapter(FO_DATE_FORMATS),
        provideLuxonDateAdapter(FO_DATE_FORMATS),
        { provide: LuxonDateAdapter, useClass: FaroeseDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: FO_DATE_FORMATS },
        { provide: DateAdapter, useClass: FaroeseDateAdapter },
    ];
}
