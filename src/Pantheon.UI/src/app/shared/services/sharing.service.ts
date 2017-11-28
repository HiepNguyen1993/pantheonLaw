import { Injectable, OnDestroy } from '@angular/core';

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

  ngOnDestroy() {
    this._printPromise = null;
  }
}
