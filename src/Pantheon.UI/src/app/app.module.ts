import { AppComponent } from './pages/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'universal-demo-v5' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
