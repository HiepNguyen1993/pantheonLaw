import { Observable } from 'rxjs/Observable';
import { element } from 'protractor';
import { filter } from 'lodash';
import { Cache } from './../../common/cache';
import { RoleUrl } from 'app/shared/urls';
import { MenuItemModel } from './../@models/menuItem.model';
import { HttpService } from './../../../core/services/http.service';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class PermissionService {
  private permissionChangeSource = new Subject<boolean>();

  public editPermission = true;

  permissionChange$ = this.permissionChangeSource.asObservable();

  getSidebars(): Observable<any> {
    return this._httpService.get(RoleUrl.MENU_ROLE_URL)
      .map(res => {
        return res.json();
      });
  }

  editPermissionChange() {
    this.permissionChangeSource.next(this.editPermission);
    this.editPermission = !this.editPermission;
  }

  editPermissionWithData(status: boolean) {
    this.editPermission = status;
    this.permissionChangeSource.next(this.editPermission);
    this.editPermission = !this.editPermission;
  }

  constructor(private _httpService: HttpService) { }

  updateMenuPermission(item) {
    return this._httpService.postData(RoleUrl.CUSTOMER_ROLE_URL, item);
  }

  IsShowElement(elementId: string) {
    if (Cache.isValid('menu_permission')) {
      const menu = Cache.getCache('menu_permission');
      const element = menu.find(item => { return item.elementId === Number.parseInt(elementId)});
      // default is show if didn't config
      if (!element || element.show === undefined || element.show === null ) {
        return true;
      }
      return element.show;
    }
    return true;
  }

  IsRequiredElement(elementId: string) {
    if (Cache.isValid('menu_permission')) {
      const menu = Cache.getCache('menu_permission');
      const element = menu.find(item => { return item.elementId === Number.parseInt(elementId) })
      return element.isRequired ? element.isRequired : false;
    }
    return false;
  }

}
