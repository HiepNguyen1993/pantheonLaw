import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectItem } from './select-item';
// import * as $ from 'jquery';
// import 'select2/dist/css/select2.css';

@Component({
  selector: 'p-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Select2Component),
            multi: true
        }
    ]
})
export class Select2Component implements OnInit, AfterViewInit {

    @Input() idField: string;

    @Input() textField: string;

    @Input() placeHolder = '';

    @Input() template: string;

    @Input() sort: boolean;

    @Output() selected = new EventEmitter<{ item, old, event }>();

    @Output() changing = new EventEmitter<any>();

    public _$select2;

    public _originalSource: Array<any>;

    public _currentItem;

    public _oldItem;

    public _loaded = false;

    public ON_SELECT = 'select2:select';
    public ON_UNSELECT = 'select2:unselecting';

    public _source: any = [];

    @Input()
    public set source(items: any) {
        this._source = this.transformSource(items);
        this._originalSource = items;

        this.requireSelect2Init();

        if (this.sort) this.sortItems(this._source);

        if (this._$select2) this.updateSource();

        if (items) {
            this.setSelect2Value(this.value);
        }
    }
    public get source(): any {
        return this._source;
    }

    public _value: any;
    @Input()
    public set value(value: any) {
        this.requireSelect2Init();

        if (value) this.setSelect2Value(value);

        this._value = value;
        this.onChange(value);
        this.onTouched();

        if (this._originalSource) {
            // tslint:disable-next-line:triple-equals
            this._currentItem = this._originalSource.find(i => i[this.idField] == value);
        }
    }
    public get value(): any {
        return this._value;
    }

    public _options: any;
    @Input()
    public set options(v: any) {
        this._options = v;
    }
    public get options(): any {
        return this._options;
    }

    public _disabled: boolean;
    @Input()
    public set disabled(value: boolean) {
        this.requireSelect2Init();
        this._$select2.prop('disabled', value);
    }
    public get disabled(): boolean {
        return this._disabled;
    }

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor(
        public elementRef: ElementRef
    ) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    public async initSelect2() {
        // require.ensure([], (require) => {
        //     require('select2');
        //     $(() => {
        //         this._$select2 = $(this.elementRef.nativeElement).find('select');
        //         this._$select2.select2({
        //             placeholder: this.placeHolder,
        //             data: this.source
        //         });
        //         this._$select2.on(this.ON_SELECT, e => this.onSelect2Change(e));
        //     });
        // });

        this._$select2 = $(this.elementRef.nativeElement).find('select');
        this._$select2.select2({
            allowClear: true,
            placeholder: this.placeHolder,
            data: this.source
        });
        this._$select2.on(this.ON_SELECT, e => this.onSelect2Change(e));
        this._$select2.on(this.ON_UNSELECT, e => this.onUnSelect2(e));
    }

    public onSelect2Change(e) {
        const value = e.target.value;
        // tslint:disable-next-line:triple-equals
        if (value == this.value) return;
        // tslint:disable-next-line:triple-equals
        const originalItem = this._originalSource.find(i => i[this.idField] == value);
        this._oldItem = this._currentItem;
        this._currentItem = originalItem;
        this.selected.emit({ item: originalItem, old: this._oldItem, event: e });
        this.value = value;
    }

    public onUnSelect2(e) {
        this._oldItem = this._currentItem;
        this._currentItem = null;
        this.selected.emit({ item: null, old: this._oldItem, event: e });
        this.value = null;
    }

    public setSelect2Value(value: string | number) {
        if (this._$select2) {
            setTimeout(() => {
                this._$select2.val(value).trigger('change');
            }, 0);
        }
    }

    public requireSelect2Init() {
        if (!this._$select2) this.initSelect2();

        return this._$select2 !== undefined;
    }

    public transformSource(source): any[] {
        if (source === undefined) return [];
        return source.map(item => {
            const tmpItem: any = {};
            tmpItem.id = item[this.idField];
            tmpItem.text = item[this.textField];

            if (item.children) {
                tmpItem.children = this.transformSource(item.children);
            }

            return tmpItem;
        });
    }

    public sortItems(source: SelectItem[]) {
        source.sort((a, b) => {
            if (a.id === '0' || a.id === 0) { return -1; };
            if (a.text < b.text) { return -1; };
            if (a.text > b.text) { return 1; };
            return 0;
        });
    }

    public updateSource() {
        const origOptions = this._$select2.data('select2').options.options;
        this._$select2.empty().select2($.extend(origOptions, { data: this.source }));
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    writeValue(value) {
        if (value) {
        this.value = value;
        }
    }
}
