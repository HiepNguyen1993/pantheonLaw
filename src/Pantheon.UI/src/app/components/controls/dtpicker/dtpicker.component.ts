import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef, OnChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Common } from '../../../common/index';

@Component({
    selector: 'p-dtpicker',
    templateUrl: './dtpicker.component.html',
    styleUrls: ['./dtpicker.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DtpickerComponent),
            multi: true
        }
    ]
})
export class DtpickerComponent implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor {

    private DTPICKERPROP = 'DateTimePicker';
    private $dtpicker;
    private _dates = {};

    @Input() inline;

    // Two-way data binding [date]
    private _date;
    @Output() dateChange: EventEmitter<any> = new EventEmitter<any>();
    @Input()
    set date(val) {
        if (val !== undefined && val !== '0001-01-01T00:00:00' && val.getFullYear && val.getFullYear() !== 1753) {
            if (this.$dtpicker !== undefined && val !== this.date) {
                this._date = val;
                this.updateValue();
                //this.onChange(val);
                const dateVal = Common.dateFormat(val, 'YYYY.MM.DD');
                this.onChange(dateVal);
                this.onTouched();
            } else {
                this._date = val;
            }

            this.dateChange.emit(val);

            if (this.$dtpicker === undefined) {
                this.bindDtPicker();
            }
        }
    }
    get date() {
        return this._date;
    }

    // Two-way data binding [multidates]
    private _multidates;
    @Output() multidatesChange: EventEmitter<any> = new EventEmitter<any>();
    @Input()
    set multidates(val) {
        if (val !== undefined) {

            if (val.length > 0) {
                val.forEach(item => {
                    this._dates[item] = true;
                });
            }

            if (this.$dtpicker !== undefined) {
                this._multidates = val;
                this.updateValue();
                this.onChange(val);
                this.onTouched();
            } else {
                this._multidates = val;
            }

            this.multidatesChange.emit(val);

            if (this.$dtpicker === undefined) {
                this.bindDtPicker();
            }
        }

    }
    get multidates() {
        return this._multidates;
    }

    // Two-way data binding [disabled]
    private _disabled;
    @Output() disabledChange: EventEmitter<any> = new EventEmitter<any>();
    @Input()
    set disabled(val) {
        this._disabled = val;
        this.disabledChange.emit(val);
    }
    get disabled() {
        return this._disabled;
    }

    @Input() format;
    @Output() change = new EventEmitter();
    @Output() dateRender = new EventEmitter();

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor(
        private elemRef: ElementRef
    ) { }

    bindDtPicker() {
        let $elem = $(this.elemRef.nativeElement);
        let isMultiDates = this.multidates !== undefined;

        if (this.inline === true) {
            $elem.children('div:first').empty();
        }

        this.$dtpicker = $elem.children('div:first');

        this.$dtpicker.datetimepicker({
            date: this.date,
            format: this.format || 'DD.MM.YYYY',
            defaultDate: this.date,
            locale: 'nb',
            inline: this.inline,
            calendarWeeks: true,
            multidates: isMultiDates
        });

        if (this.multidates) {
            this.loadMultiDates();
        }

        this.$dtpicker.on('dp.change', (e) => {
            if (!e.date) {
              this.onChange(undefined);
              this.onTouched();
              return;
            }
            // [DD]: Convert to datetime from 00:00:00
            const d: Date = e.date._d;
            this.date = new Date(d.getFullYear(), d.getMonth(), d.getDate());

            // [DD]: If multiple mode
            if (this.multidates) {
                this.loadMultiDates(Common.dateFormat(this.date, 'DD.MM.YYYY'));
                let tempDates = Object.keys(this._dates).map(prop => {
                    if (this._dates[prop] === true) {
                        return prop;
                    }
                }).filter(item => item !== undefined);
                this.multidates = tempDates;
            }
            this.change.emit(e);
            this.reloadStyle($(e.target));
        });

        this.$dtpicker.on('dp.show', (e) => {
            this.reloadStyle($(e.target));
            if (this.multidates) { this.loadMultiDates(); }
        });

        this.$dtpicker.on('dp.update', (e) => {
            this.reloadStyle($(e.target));
            if (this.multidates) { this.loadMultiDates(); }
        });

        // Reload specify dates on init time
        /*setTimeout(() => {
            this.reloadStyle($elem);
        }, 500);*/
    }

    loadMultiDates(dateString = null) {
        this.$dtpicker.find('td[data-day]').removeClass('active');
        if (this._dates[dateString]) {
            this._dates[dateString] = !this._dates[dateString];
        } else if (dateString !== null) {
            this._dates[dateString] = true;
        }
        this.$dtpicker.find('td[data-day]').each((i, elem) => {
            let $elem = $(elem);
            let dataDay = $elem.attr('data-day');
            if (this._dates[dataDay]) {
                $elem.addClass('dtpicker-multi');
            } else {
                $elem.removeClass('dtpicker-multi');
            }
        });
    }

    reloadStyle($elem = $(this.elemRef.nativeElement)) {
        $elem.find('[data-day]').each((i, elem) => {
            this.dateRender.emit({ e: elem, value: $(elem).attr('data-day') });
        });
    }

    ngOnInit() {
        this.bindDtPicker();
    }

    ngAfterViewInit() {

    }

    updateValue() {
        if (!this.multidates) {
            this.$dtpicker.data(this.DTPICKERPROP).date(new Date(this.date));
            this.reloadStyle(this.$dtpicker);
        } else {
            this.loadMultiDates();
        }
    }

    ngOnChanges(changes: any) {
        if (this.$dtpicker !== undefined) {
            this.$dtpicker.find('input').attr('disabled', this.disabled);
        }
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    writeValue(date) {
        if (date) {
            this._date = date;
        }
    }
}
