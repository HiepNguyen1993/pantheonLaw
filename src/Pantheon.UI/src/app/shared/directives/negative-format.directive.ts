import { SafeUnsubscriber } from './../../common/safeUnsubscriber';
import { NgModel } from '@angular/forms';
import { Directive, OnInit, ElementRef, Input, Renderer2, AfterViewInit } from '@angular/core';
import { Common } from '../../common';
import 'rxjs/Rx';

@Directive({
  selector: '[negativeformat]'
})
export class NegativeFormatDirective extends SafeUnsubscriber implements OnInit, AfterViewInit {
  @Input() formatNegative = false;
  private negativeClass = 'negative-number';
  constructor(
    private elemRef: ElementRef,
    private renderer: Renderer2,
    private ngModel: NgModel
  ) { super(); }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.checkNegativeNumber();

    const subscribe = this.ngModel.valueChanges
    .debounceTime(200)
    .subscribe(res => {
      this.checkNegativeNumber();
    });
    this.safeSubscription(subscribe);
  }

  checkNegativeNumber() {
    const $elem = $(this.elemRef.nativeElement);
    const value = this.tryFloatParse($elem[0].value);
    if (value < 0) {
      this.renderer.addClass(this.elemRef.nativeElement, this.negativeClass);
    } else {
      this.renderer.removeClass(this.elemRef.nativeElement, this.negativeClass);
    }
  }

  tryFloatParse(value) {
    let outRs = null;
    if (Number(value)) {
      return parseFloat(value);
    }
    if (value !== null && value !== undefined) {
      if (value.length > 0) {
        if (!isNaN(value)) {
          outRs = parseFloat(value);
          return outRs;
        }
      }
    }
    return outRs;
  }
}
