import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions } from '@angular/http';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {

  private get TOKEN(): string {
    const token = localStorage.getItem('access_token');
    return token;
  }

  constructor() {
    super();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    if (this.TOKEN) {
      this.headers.append('Authorization', 'bearer ' + this.TOKEN);
    }
  }
}

export const requestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptions };
