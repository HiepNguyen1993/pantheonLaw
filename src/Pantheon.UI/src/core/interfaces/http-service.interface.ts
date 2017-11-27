import { Observable } from 'rxjs/Observable';
import { RequestOptionsArgs, Response } from '@angular/http';

export interface ErrorMessage {
    status: number;
    statusCode: string;
    error: string;
    message: string;
}

export interface IHttpService {
    create: (url: string, data: any) => Observable<Response>;
    update: (url: string, data: any) => Observable<Response>;
    remove: (url: string, id: any, headers?: any) => Observable<Response>;
    getAll: (url: string) => Observable<Response>;
    getById: (url: string, id: any) => Observable<Response>;
    getQueries: (url: string, queries: any) => Observable<Response>;
    get: (url: string, options?: RequestOptionsArgs) => Observable<Response>;
    post: (url: string, body: string, options?: RequestOptionsArgs) => Observable<Response>;
    put: (url: string, body: string, options?: RequestOptionsArgs) => Observable<Response>;
    delete: (url: string, data?, options?: RequestOptionsArgs) => Observable<Response>;
    patch: (url: string, body: string, options?: RequestOptionsArgs) => Observable<Response>;
    head: (url: string, options?: RequestOptionsArgs) => Observable<Response>;
}
