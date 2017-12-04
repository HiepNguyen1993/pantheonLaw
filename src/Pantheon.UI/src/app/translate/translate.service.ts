import { Injectable, Inject, EventEmitter } from '@angular/core';
import { _translations } from './translations';
import { TranslateOption } from '../shared/enums';
import { SUPPORTED_LANGUAGES } from './languages.list';
import { capitalize, upperCase } from 'lodash';
import { ValueUrl } from '../shared/urls/values.url';
import { LanguageModel } from './@models/language.model';
import { HttpService } from '../../core/index';

@Injectable()
export class TranslateService {
  private _currentLang: string;
  private PLACEHOLDER = '%';
  private _defaultLang: string;
  private _fallback: boolean;
  private _languagesMapping: LanguageModel[] = [];

  public onLangChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _httpService: HttpService
  ) {
    this._currentLang = this._defaultLang = this.defaultLang;

    this._httpService.get(ValueUrl.GET_LANGUAGES)
      .map(res => res.json())
      .subscribe(languages => {
        this._languagesMapping = languages;
      });
  }

  public get currentLang() {
    return this._currentLang || this._defaultLang;
  }

  public get defaultLang() {
    return 'nb';
  }

  public get currentSKOD(): any {
    const currentLang = SUPPORTED_LANGUAGES.find(lang => lang.value === this.currentLang);
    const languageMappping = this._languagesMapping.find(x => x.culture.indexOf(currentLang.value) > -1);
    if (!languageMappping) { return 1; };
    return languageMappping.skod;
  }

  public setDefaultLang(lang: string) {
    this._defaultLang = lang;
  }

  public enableFallback(enable: boolean) {
    this._fallback = enable;
  }

  // inject our translations

  public use(lang: string): void {
    // set current language
    this._currentLang = lang;
    this.onLangChanged.emit(lang);
  }

  public translate(key: string): string {
    const translation = key;

    // found in current language
    if (_translations[this.currentLang] && _translations[this.currentLang][key]) {
      return _translations[this.currentLang][key];
    }

    // fallback disabled
    if (!this._fallback) {
      return translation;
    }

    // found in default language
    if (_translations[this._defaultLang] && _translations[this._defaultLang][key]) {
      return _translations[this._defaultLang][key];
    }

    // not found
    return translation;
  }

  public instant(key: string, args?: string | string[]) {
    // public perform translation
    let translation: string = this.translate(key);

    if (!args) {
      return capitalize(translation);
    } else {
      translation = capitalize(translation);
      if (args === TranslateOption.UPPER) { translation = translation.toUpperCase(); };
      return this.replace(translation, args);
    }
  }

  public replace(word = '', words: string | string[] = '') {
    let translation: string = word;

    const values: string[] = [].concat(words);
    values.forEach((e, i) => {
      translation = translation.replace(this.PLACEHOLDER.concat(<any>i), e);
    });

    return translation;
  }

}
