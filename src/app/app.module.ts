import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { RootComponent }  from './components/root.component'

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ RootComponent ],
  bootstrap:    [ RootComponent ]
})

export class AppModule { }
