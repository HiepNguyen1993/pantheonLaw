import { AppComponent } from './pages/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from './shared/shared.module';
import { RoutingDefined } from './app.routing';
import { TopHeaderComponent } from './pages/top-header/top-header.component';
import { MainNavigatorComponent } from './pages/main-navigator/main-navigator.component';
import { FooterComponent } from './pages/footer/footer.component';
import { CopyRightComponent } from './pages/copy-right/copy-right.component';
import { FooterBreadcrumComponent } from './pages/footer-breadcrum/footer-breadcrum.component';
import { TranslateService } from './translate/translate.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopHeaderComponent,
    MainNavigatorComponent,
    FooterComponent,
    CopyRightComponent,
    FooterBreadcrumComponent
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
