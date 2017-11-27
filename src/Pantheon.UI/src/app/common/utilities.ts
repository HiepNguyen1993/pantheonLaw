import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {isString} from 'lodash';

@Injectable()
export class Utilities {
    constructor(private title: Title) {
    }
}

export class DateTimeUtil {
    public static daysInMonth(args = {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    }) {
        return new Date(args.year, args.month + 1, 0).getDate();
    }

    public static addDays(date: Date = new Date(), days = 0): Date {
        const newDate: number = date.getDate() + days;
        date.setDate(newDate);
        return date;
    }
}

export class NumberUtil {
    public static norwayToDefautNumber(numberString: any) {
        if (!isString(numberString)) {
            return numberString;
        }
        numberString = numberString.replace(/\./, '');
        return parseFloat(numberString.replace(/,/, '.'));
    }
}
