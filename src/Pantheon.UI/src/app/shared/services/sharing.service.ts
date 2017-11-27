import { element } from 'protractor';
import { Injectable, OnDestroy } from '@angular/core';
var objectPath = require("object-path"); // https://github.com/mariocasciaro/object-path

@Injectable()
export class SharingService implements OnDestroy {
  private persistDataPrefix = '__dat_';
  private _printPromise: Promise<any>;

  constructor() { }

  setPrintPromise(promise) {
    this._printPromise = promise;
  }

  getPrintPromise(): Promise<any> {
    return this._printPromise;
  }

  persistProperties(obj, screenName, persistFields) {
    if (!persistFields) { return; }

    let scope = {};
    try {
      persistFields.forEach(field => {
        scope[field] = objectPath.get(obj, field);
      });
      // check if scope object has any properties
      if (Object.keys(scope).length > 0) {
        localStorage.setItem(this.persistDataPrefix + screenName, JSON.stringify(scope));
      }
    } catch (e) {
      console.log(e);
    }
  }

  restorePersistedProperties(obj, screenName, persistFields) {

    try {
      let persistedVal = localStorage.getItem(this.persistDataPrefix + screenName);
      if (!persistedVal) { return; }

      let scope = JSON.parse(persistedVal);
      // check if scope object has any properties
      Object.keys(scope).map((e) => {
        if (scope[e] && persistFields.indexOf(e) !== -1) {
            let propertyValue = scope[e];
            // console.log(`key=${e}  value=${propertyValue}`);
            let timestamp = Date.parse(propertyValue);

            if (isNaN(timestamp) === false && propertyValue.length > 10) {
                objectPath.set(obj, e, new Date(propertyValue));
            } else {
              objectPath.set(obj, e, propertyValue);
            }
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  ngOnDestroy() {
    this._printPromise = null;
  }
}
