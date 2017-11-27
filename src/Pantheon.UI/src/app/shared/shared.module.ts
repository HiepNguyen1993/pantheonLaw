

// core module
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// translate module
import { TranslatePipe } from '../translate/translate.pipe';
import { LanguageService } from './services/language.service';

// common component
import { Select2Component } from '../components/controls/select2/select2.component';
import { JsGridComponent } from '../components/controls/js-grid/js-grid.component';

// common directive
import { DecimalNumbericDirective } from './directives/decimal-numberic.directive';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { DisabledAllDirective } from './directives/disabled-all.directive';

// common Service
import { SharingService } from './services/sharing.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        TranslatePipe,
        DecimalNumbericDirective,
        OnlyNumberDirective,
        DisabledAllDirective,
        JsGridComponent,
        Select2Component
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslatePipe,
        DecimalNumbericDirective,
        OnlyNumberDirective,
        DisabledAllDirective,
        JsGridComponent,
        Select2Component
    ], entryComponents: [
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers:
            [
                LanguageService, SharingService
            ]
        };
    }
}
