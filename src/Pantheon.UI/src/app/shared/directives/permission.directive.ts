import { find } from 'lodash';
import { async } from '@angular/core/testing';
import { Cache } from './../../common/cache';
import { element } from 'protractor';
import { SafeUnsubscriber } from './../../common/safeUnsubscriber';
import { PermissionService } from './../services/permission.service';
import { Directive, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[permission]'
})
export class PermissionDirective extends SafeUnsubscriber implements OnInit, AfterViewInit {
  public isEdit = false;
  private isAdmin = false;
  private isShow = false;
  private elementId;
  private isRequired = false;
  constructor(
    public elemRef: ElementRef,
    public _permissionService: PermissionService
  ) {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const $elem = $(this.elemRef.nativeElement);
    this.elementId = $elem.attr('name');
    this.isShow = this._permissionService.IsShowElement(this.elementId);
    this.isRequired = this._permissionService.IsRequiredElement(this.elementId);
    if (!this.isShow) {
      this.elemRef.nativeElement.style.display = 'none';
    }
    if (this.isShow) {
      this.elemRef.nativeElement.style.display = 'inherit';
    }

    this._permissionService.permissionChange$.subscribe(edit => {
      if (edit) {
        const that = this;
        let menu = [];
        if (Cache.isValid('menu_permission')) {
          menu = Cache.getCache('menu_permission');
        }
        if ( this.isRequired ) {
          // $elem.prepend('<input type="checkbox" class="permission-edit" disabled>');
          $elem.prepend(`
            <div class="permission-edit">
              <input type="checkbox" id="menu_${this.elementId}" disabled />
              <label for="menu_${this.elementId}"></label>
            </div>
          `);
        } else {
          // $elem.prepend('<input type="checkbox" class="permission-edit">');
          $elem.prepend(`
            <div class="permission-edit">
              <input type="checkbox" id="menu_${this.elementId}" />
              <label for="menu_${this.elementId}"></label>
            </div>
          `);
        }
        const $editChange = $elem.first().find('.permission-edit input').first();
        $editChange.prop('checked', this.isShow);
        // check event check update permission
        $($editChange).change(
          function () {
            if (Cache.isValid('menu_permission')) {
              menu = Cache.getCache('menu_permission');
            }
            if ($(this).is(':checked')) {
              that.editPermissionMenu(true);
            } else {
              that.editPermissionMenu(false);
            }
          });

        this.elemRef.nativeElement.style.display = 'inherit';
      } else {
        $elem.first().find('.permission-edit').remove();
        this.isShow = this._permissionService.IsShowElement(this.elementId);
        if (!this.isShow) {
          this.elemRef.nativeElement.style.display = 'none';
        }
        if (this.isShow) {
          this.elemRef.nativeElement.style.display = 'inherit';
        }
      }
    });
  }

  async editPermissionMenu(status: boolean) {
    let menu = [];
    if (Cache.isValid('menu_permission')) {
      menu = Cache.getCache('menu_permission');
    }
    const element = menu.find(item => { return item.elementId === Number.parseInt(this.elementId) });
    element.show = status;
    await this.checkRelationshipUi(menu, status);
    Cache.setCache('menu_permission', menu);
  }

  checkRelationshipUi(menu, status) {
    const element = menu.find(item => { return item.elementId === Number.parseInt(this.elementId); });
    if (element.type == 1) {
      const childElement = menu.filter(item => { return item.parentElementId === Number.parseInt(element.parentElementId); });
      const checkedChild = childElement.filter(item => { return item.show === true; });
      const parentElement = menu.filter(item => { return item.elementId === Number.parseInt(element.parentElementId); });
      if (checkedChild.length > 0) {
        $('#side-menu li[name=' + parentElement[0].elementId + ']').children('.permission-edit').children('input').prop('checked', true);
        console.log(parentElement[0].elementId + ' checked');
        parentElement[0].show = true;
      } else {
        $('#side-menu li[name=' + parentElement[0].elementId + ']').children('.permission-edit').children('input').prop('checked', false);
        console.log(parentElement[0].elementId + ' unchecked');
        parentElement[0].show = false;
      }
      console.log(childElement);
    } else if (element.type == 0) {
      const childElement = menu.filter(item => { return item.parentElementId === Number.parseInt(this.elementId); });
      childElement.forEach( element => {
        element.show = status;
        $('#side-menu li[name=' + element.elementId + ']').children('.permission-edit').children('input').prop('checked', status);
      });
    }
    Cache.setCache('menu_permission', menu);
  }

}
