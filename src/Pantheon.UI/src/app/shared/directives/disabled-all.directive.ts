import { Directive, OnInit, AfterViewInit, OnChanges, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[disabledAll]'
})
export class DisabledAllDirective implements OnInit, AfterViewInit, OnChanges {

    @Input() disabledAll: boolean;
    @Input() hideLoading: boolean;

    constructor(
        private elemRef: ElementRef,
        private renderer: Renderer) { }

    ngOnInit() { }

    ngOnChanges(changes: any) {

        let $elem = $(this.elemRef.nativeElement);
        $elem.find('input, select').prop('disabled', this.disabledAll);

        if (this.disabledAll) {
          $elem.find('input, select, button').prop('disabled', true);
          if (!this.hideLoading) {
            $elem.prepend($(`<span class="loading-page-content" lg="LOADING" >
                <i class="fa fa-circle-o-notch fa-1x fa-spin fa-fw"></i>Laster...</span>`));
          }
        } else {
          $elem.find('input, select, button').prop('disabled', false);
          $elem.find('.loading-page-content').first().remove();
        }
    }

    ngAfterViewInit() { }
}
