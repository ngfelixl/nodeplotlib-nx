import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { MatModule } from './mat/mat.module';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from '@nodeplotlib/pages';
import { DataPersistence } from '@nrwl/nx';
import { components } from './components/index';

@NgModule({
  declarations: [AppComponent, components],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PagesModule,
    StoreModule.forRoot(
      {},
      { metaReducers: !environment.production ? [storeFreeze] : [] }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MatModule
  ],
  providers: [DataPersistence],
  bootstrap: [AppComponent]
})
export class AppModule {}
