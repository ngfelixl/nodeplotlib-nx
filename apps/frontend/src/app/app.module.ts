import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { PlotsComponent } from './components/plots/plots.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HelpComponent } from './components/help/help.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatModule } from './mat/mat.module';
import { PlotComponent } from './components/plot/plot.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from '@nodeplotlib/pages';

@NgModule({
  declarations: [AppComponent, PlotsComponent, PageNotFoundComponent, HelpComponent, ToolbarComponent, PlotComponent],
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
