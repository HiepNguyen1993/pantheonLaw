import { async } from '@angular/core/testing';
import { PermissionService } from './../services/permission.service';
import { SafeUnsubscriber } from './../../common/safeUnsubscriber';
import { UIConfigService } from './../services/ui-config.service';
import { Directive, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[uiConfig]'
})
export class UiConfigDirective extends SafeUnsubscriber implements OnInit, AfterViewInit {

  private _checboxClassName = 'edit-element-checkbox';
  private _boxEditElementClassName = 'editing-element-box';
  private $elem: any;
  private isShow: boolean;
  private isRequired: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('uiConfig') UiIdConfig: string;
  constructor(
    private el: ElementRef,
    private _uiConfigServie: UIConfigService,
    private _permissionService: PermissionService
  ) {
    super();
    this.$elem = $(el.nativeElement);

    // regist event when data finish loading
    this._uiConfigServie._finishLoadingEvent$.subscribe(edit => {
      this.checkShowAndRequired();
    });
  }

  ngOnInit() {
    this.checkShowAndRequired();
  }

  private checkShowAndRequired() {
    this.isShow = this._uiConfigServie.IsShowElement(this.UiIdConfig);
    this.isRequired = this._uiConfigServie.IsRequiredElement(this.UiIdConfig);

    if (!this.isShow) {
      this.hideElement();
    } else {
      this.showElement();
    }
  }

  ngAfterViewInit(): void {
    // regist listening event when user click on edit layout
    this._permissionService.permissionChange$.subscribe(isEdit => {
      this.editUiConfigItem(isEdit);
    });
    this.editUiConfigItem(this._uiConfigServie.isEditingUi);
  }

  private editUiConfigItem(isEdit: boolean) {
    this._uiConfigServie.isEditingUi = isEdit;
    if (isEdit) {
      this.enableEditElement();
    } else {
      this.applyEditElementLayout();
    }
  }

  private enableEditElement() {

    // add checkbox edit layout
    if (this.isRequired) {  // disable editing for required field
      this.$elem
        .prepend('<div class="row ' + this._boxEditElementClassName
        + '"><input type="checkbox" class="' + this._checboxClassName
        + '" disabled></div>');

    } else {
      this.$elem
        .prepend('<div class="row ' + this._boxEditElementClassName
        + '"><input type="checkbox" class="' + this._checboxClassName
        + '"></div>');

    }

    const $editBox = this.$elem.first().find('.' + this._boxEditElementClassName).first();

    // set value for checkbox
    const $editChange = this.$elem.first().find('.' + this._checboxClassName).first();
    $editChange.prop('checked', this.isShow);

    if (!this.isRequired) { // only allow to edit required field
      // binding mouse click on edit-box
      $($editBox).click(() => {
        console.log("kbox change");
        this.isShow = !this.isShow;
        $editChange.prop('checked', this.isShow);
        this._uiConfigServie.updateUIConfigElement(this.UiIdConfig, this.isShow);
      });
    }

    // show hide element for setting layout
    this.showElement();
  }


  private applyEditElementLayout() {
    // remove checkbox edit element
    this.$elem.first().find('.' + this._boxEditElementClassName).remove();

    if (!this.isShow) {
      this.hideElement();
    } else {
      this.showElement();
    }
  }

  private showElement() {
    this.el.nativeElement.style.display = 'inherit';
  }

  private hideElement() {
    this.el.nativeElement.style.display = 'none';
  }
}
