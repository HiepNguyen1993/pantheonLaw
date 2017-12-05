import { Alerts } from './alerts';
import { Utilities } from './utilities';
import { NotifyType, Constants } from './const';
import { FormGroup, FormControl } from '@angular/forms';
import { filter, find } from 'lodash';
import { WebCore } from '../../site';
import { mailFormat } from '../../core/index';

declare var ExcellentExport: any, __Module: any, moment: any;

export class Common {
    public static getRandomNumber(min: number, max: number) {
        const num = Math.random() * (max - min) + min;
        return Math.round(num);
    }

    public static tryToWait(maxLoop, time, condition: Function, callback: Function) {
        WebCore.tryToFinished(maxLoop, condition, callback, time);
    }

    public static setNavMenuTitle(string) {
        $('#navMenuTitle').text(string);
        document.title = string.replace(/\./g, '_');
    }

    public static throwErrorOrBadRequest(error) {
        Alerts.errorNotify(error);
    }

    public static getApiData(res: any) {
        return res.json()['data'] || res.json()['Result'] || res.json();
    }

    public static isValidDate(date, format) {
        return moment(date).format(format) !== 'Invalid date';
    }

    public static dateFormat(value, format = 'YYYY.MM.DD') {
        if (!Common.isValidDate(value, format)) {
            return value;
        }
        return (value === null || value === undefined) ? '-' : moment(value).format(format);
    }

    public static getMinDate(): Date {
        return new Date(1753, 1, 1, 0, 0, 0, 0);
    }

    public static numFormat(value, forInput = true, decimalnumber = 2) {
        if (value === null || value === undefined) {
            return '';
        }
        let intlValue;
        if (decimalnumber) {
            // tslint:disable-next-line:max-line-length
            intlValue = Intl.NumberFormat('it-IT', { minimumFractionDigits: decimalnumber, maximumFractionDigits: decimalnumber }).format(value);
        }
        return forInput ? intlValue.replace(/\./, '') : intlValue;
    }

    public static onFormValueChanged(form: FormGroup, formErrors: any, validationMessages: any, data?: any) {
        if (!form) { return; }
        for (const field in formErrors) {
            if (formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                formErrors[field] = '';
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }

    public static enableAllFormControls(form: FormGroup, excludeControls: Array<string>) {
        for (const control in form.controls) {
            if (control && excludeControls.indexOf(control) === -1) {
                form.controls[control].enable();
            }
        }
    }

    public static disableAllFormControls(form: FormGroup, excludeControls: Array<string>) {
        for (const control in form.controls) {
            if (control && excludeControls.indexOf(control) === -1) {
                form.controls[control].disable();
            }
        }
    }

    public static setFormValue(form: FormGroup, ctlName: string, value: any) {
        if (!form) { return; }
        (<FormControl>form.controls[ctlName]).setValue(value, { onlySelf: true });
    }

    public static createExcelFile(anchor = window, data, sheetName = 'Sheet1', fileName = 'export.xls') {
        return ExcellentExport.excel(anchor, data, sheetName, fileName);
    }

}
