import { Directive, ElementRef, AfterViewInit, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[only-number]'
})
export class OnlyNumberDirective implements AfterViewInit {

  @Input() noComma: boolean;

  constructor(
    private elemRef: ElementRef,
    private renderer: Renderer
  ) { }

  ngAfterViewInit() {
    let $elem = $(this.elemRef.nativeElement);
    $elem.keydown(this.onlyKeydownNumber);
    //this.renderer.setElementClass(this.elemRef.nativeElement, 'only-number', true);
  }

  // ref: http://stackoverflow.com/questions/995183/how-to-allow-only-numeric-0-9-in-html-inputbox-using-jquery
  private onlyKeydownNumber = (e) => {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110,
      (this.noComma) ? null : 188]) !== -1 ||
      // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||

      // Allow: Ctrl+C, Command+C
      (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||

      // Allow: Ctrl+V, Command+V
      (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||

      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)) {

      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }
}
