import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LanguageService {

  private languageChangeSource = new Subject<string>();

  languageChange$ = this.languageChangeSource.asObservable();

  languageChange(lang: string) {
    this.languageChangeSource.next(lang);
  }

  constructor() { }
}
