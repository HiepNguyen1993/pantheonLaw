import { AuthService } from './auth.service';
import { IHttpService, ErrorMessage } from './../interfaces/http-service.interface';
import {
  Http, RequestMethod, Request, RequestOptions, Headers, RequestOptionsArgs,
  URLSearchParams, Response
} from '@angular/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from '../../config/api.config';

// Rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Common } from '../../app/common/common';

@Injectable()

export class HttpService implements IHttpService {

  private _apiPath = ApiConfig.url();

  constructor(
    private http: Http,
    private _authService: AuthService
  ) { }

  /**
   * Get current token stored in localStore/..
   * @readonly
   * @private
   * @type {string}
   * @memberof HttpService
   */
  private get TOKEN(): string {
    const token = this._authService.getToken('access_token');
    return token;
  }

  /**
   * Set headers each requests with authorization
   * @private
   * @returns
   * The headers contains assets token
   * @memberof HttpService
   */
  private setHeaders() {
    const authHeaders = new Headers();
    authHeaders.append('Content-Type', 'application/json');
    authHeaders.append('Accept', 'application/json');
    authHeaders.append('Authorization', 'bearer ' + this.TOKEN);
    return authHeaders;
  }

  private execute(options: any) {
    return this.http.request(new Request(options)).catch(
      error => {
        console.log(error);
        let errMsg = 'error';
        if (error.status === 401 && error.statusText === 'Unauthorized') {
            console.log('Unauthorized status - Force user re-login');
            this._authService.forceReLogin();
        } else {
            errMsg = error.json();
            console.log(errMsg);

            switch (error.status) {
                case 0:
                  // Common.throwErrorOrBadRequest('Your back-end server might not be available!');
                  break;
                case 500:
                    const token_expire_time = this._authService.getToken('token_expire');
                    if (token_expire_time && new Date(token_expire_time).getTime() < new Date().getTime()) {
                        this._authService.forceReLogin();
                    }
                    Common.throwErrorOrBadRequest(error.json().message);
                    break;
            }
        }
        return Observable.throw(error);
    });
  }

  create(url: string, data: any) {

    const headers = this.setHeaders();
    const options = new RequestOptions({
      method: RequestMethod.Post,
      url: this._apiPath + url,
      withCredentials: true,
      headers: headers,
      body: JSON.stringify(data)
    });

    return this.execute(options);
  }

  update(url: string, data: any) {

    const headers = this.setHeaders();
    const options = new RequestOptions({
      method: RequestMethod.Put,
      url: this._apiPath + url,
      headers: headers,
      body: JSON.stringify(data)
    });

    return this.execute(options);
  }

  remove(url: string, id: any, headers?: any) {

    headers = headers ? new Headers(headers) : this.setHeaders();
    const options = new RequestOptions({
      method: RequestMethod.Delete,
      url: this._apiPath + url + '/' + id,
      headers: headers
    });

    return this.execute(options);
  }

  getAll(url: string) {
    const headers = this.setHeaders();

    const options = new RequestOptions({
      method: RequestMethod.Get,
      url: this._apiPath + url,
      headers: headers
    });

    return this.execute(options);
  }

  getById(url: string, id: any) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('id', id);
    const headers = this.setHeaders();
    const options = new RequestOptions({
      method: RequestMethod.Get,
      url: this._apiPath + url,
      headers: headers,
      search: params
    });

    return this.execute(options);
  }

  getQueries(url: string, queries: any): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    Object.keys(queries || {}).forEach(prop => {
      params.set(prop, queries[prop]);
    });
    const options = new RequestOptions({
      search: params
    });
    return this.get(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {

    const reqOpts = options || {};
    reqOpts.headers = reqOpts.headers ? new Headers(reqOpts.headers) : this.setHeaders();
    reqOpts.body = reqOpts.body || '';
    reqOpts.method = RequestMethod.Get;
    reqOpts.url = this._apiPath + url;

    return this.execute(reqOpts);
  }

  getWithData(url: string, data: any): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    Object.keys(data || {}).forEach(prop => {
      params.set(prop, data[prop]);
    });
    const options = new RequestOptions({
      search: params
    });
    return this.get(url, options);
  }

  postData(url: string, data: any) {
    const reqOpts: RequestOptionsArgs = {};

    reqOpts.headers = reqOpts.headers ? new Headers(reqOpts.headers) : this.setHeaders();
    reqOpts.method = RequestMethod.Post;
    reqOpts.url = this._apiPath + url;
    reqOpts.body = data;
    return this.execute(reqOpts);
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    const reqOpts = options || {};

    reqOpts.headers = reqOpts.headers ? new Headers(reqOpts.headers) : this.setHeaders();
    reqOpts.method = RequestMethod.Post;
    reqOpts.url = this._apiPath + url;
    reqOpts.body = body;

    return this.execute(reqOpts);
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    const reqOpts = options || {};

    reqOpts.headers = reqOpts.headers ? new Headers(reqOpts.headers) : this.setHeaders();
    reqOpts.method = RequestMethod.Put;
    reqOpts.url = this._apiPath + url;
    reqOpts.body = body || '';

    return this.execute(reqOpts);
  }

  delete(url: string, data?, options?: RequestOptionsArgs): Observable<Response> {
    const reqOpts = options || {};

    reqOpts.headers = reqOpts.headers ? new Headers(reqOpts.headers) : this.setHeaders();
    reqOpts.method = RequestMethod.Delete;
    reqOpts.url = this._apiPath + url;
    reqOpts.body = data;

    return this.execute(reqOpts);
  }
  patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    const reqOpts = options || {};

    reqOpts.headers = reqOpts.headers ? new Headers(reqOpts.headers) : this.setHeaders();
    reqOpts.method = RequestMethod.Patch;
    reqOpts.url = this._apiPath + url;
    reqOpts.body = body;

    return this.execute(reqOpts);
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    const reqOpts = options || {};

    reqOpts.headers = reqOpts.headers ? new Headers(reqOpts.headers) : this.setHeaders();
    reqOpts.method = RequestMethod.Head;
    reqOpts.url = this._apiPath + url;

    return this.execute(reqOpts);
  }
}
