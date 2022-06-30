import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IndexComponent } from './component/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, IndexComponent]
})
export class AppModule { }
