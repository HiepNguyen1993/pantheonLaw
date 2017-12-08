import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { RoutingDefined } from './app.routing';
import { TopHeaderComponent } from './pages/top-header/top-header.component';
import { CopyRightComponent } from './pages/copy-right/copy-right.component';
import { TranslateService } from './translate/translate.service';

import { AppComponent } from './pages/app/app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { FooterCopyRightComponent } from './pages/footer-copy-right/footer-copy-right.component';
import { FooterBreadcrumComponent } from './pages/footer-breadcrum/footer-breadcrum.component';
import { MainNavigatorComponent } from './pages/main-navigator/main-navigator.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FooterCopyRightComponent,
    FooterBreadcrumComponent,
    MainNavigatorComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'universal-demo-v5' }),
    RoutingDefined,
    SharedModule.forRoot()
  ],
  providers: [
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
