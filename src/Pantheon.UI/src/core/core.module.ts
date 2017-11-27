import { requestOptionsProvider } from './strategies/default-request-options';
import { CustomPreloading, customPreloadingProvider } from './strategies/custom-preloading';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [HttpService, AuthService],
  exports: [
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        HttpService,
        AuthService,
        customPreloadingProvider,
        requestOptionsProvider
      ]
    };
  }
};

