import { filter } from 'lodash';
import { ValueUrl } from './../urls/values.url';
import { Observable } from 'rxjs/Observable';
import { Common } from 'app/common';
import { Cache } from './../../common/cache';
import { RoleUrl } from './../urls/role.url';
import { HttpService } from './../../../core/services/http.service';
import { Subject } from 'rxjs/Subject';
import { element } from 'protractor';
import { UiConfig } from './../@models/uiConfig.model';
import { Injectable, Input } from '@angular/core';

@Injectable()
export class UIConfigService {

    private _finishLoadingSource = new Subject<boolean>();
    private _isEditingUi = false;

    get isEditingUi(): boolean {
        return this._isEditingUi;
    }

    @Input('isEditingUi')
    set isEditingUi(value: boolean) {
        this._isEditingUi = value;
    }

    _finishLoadingEvent$ = this._finishLoadingSource.asObservable();

    private CACHE_NAME = '_ui-config-setting';
    constructor(private _httpService: HttpService) {
        // geting data from server
        if (!Cache.getCache(this.CACHE_NAME)) {
            this.getAllUIConfigFromServer();
        }
    }

    /** Check all element config or one element config is set to hidden
     * uiids: List of uuid / only one uuid.*/
    IsShowElement(uiids: string) {
        if (Cache.isValid(this.CACHE_NAME)) {
            const UiConfigData = Cache.getCache(this.CACHE_NAME);
            if (UiConfigData && UiConfigData.length >= 0) {
                const arryUUID = uiids.split(';');

                const totalItem = arryUUID.length;
                let counter = 0;
                for (const uuid of arryUUID) {
                    for (const element of UiConfigData) {
                        if (element.uiid === uuid) {
                            if (element.isShow) {
                                return true;
                            } else {
                                counter += 1;
                            }
                        }
                    }
                }
                // if all element config is found and set to hidden, then return false.
                // else return true
                if (counter === totalItem) {
                    return false;
                }
            }
        }
        return true;
    }

    IsRequiredElement(uiid: string) {
        const UiConfigData = Cache.getCache(this.CACHE_NAME);
        if (UiConfigData && UiConfigData.length >= 0) {
            for (let i = 0; i < UiConfigData.length; i++) {
                if (UiConfigData[i].uiid === uiid) {
                    if (UiConfigData[i].isRequired) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }

        return false;
    }

    /**
     * udpate ui-config-element to localdata and update to server.
     * Return true if update success. Return false if can not update element
     * @param IDUiConfig UIID element
     * @param isShow 
     */
    updateUIConfigElement(IDUiConfig: string, isShow: boolean) {
        // update local store
        const uiConfigData = Cache.getCache(this.CACHE_NAME);

        if (!uiConfigData) {
            return;
        };
        const elements = uiConfigData.filter(item => item.uiid === IDUiConfig);
        if (elements && elements.length > 0) {
            elements[0].isShow = isShow;
        } else { // if item is not in data, so update list
            const newItem: UiConfig = new UiConfig();
            newItem.uiid = IDUiConfig;

            if (this.updateChildNode(IDUiConfig, isShow)) {
                newItem.isShow = isShow;
            }

            uiConfigData.push(newItem);
        }

        Cache.setCache(this.CACHE_NAME, uiConfigData);

        return true;
    }

    private updateChildNode(uiid: string, isShow: boolean): boolean {
        const uiConfigData = Cache.getCache(this.CACHE_NAME);
        uiConfigData.forEach(element => {
            if (element.parentId === uiid) {
                // update child element
                if (element.isRequired) {
                    return false;
                } else {
                    return true;
                }
            }
        });
        return true;
    }

    /**
     * Get ui config from server
     */
    getAllUIConfigFromServer() {
        return this._httpService.get(RoleUrl.UICONFIG_GET_ALL_URL).map(res => res.json()).subscribe(data => {
            // save data to localstore
            Cache.setCache(this.CACHE_NAME, data.data);
            this._finishLoadingSource.next();
        });
    }

    saveUiConfig() {
        // update value to server
        this._httpService.postData(RoleUrl.UICONFIG_UPDATE_ITEM_URL, Cache.getCache(this.CACHE_NAME))
            .map(res => res.json())
            .subscribe(data => {
                // save data to localstore
                console.log('OK');
            });
    }
}

