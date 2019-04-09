import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlotsComponent } from './components/plots/plots.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HelpComponent } from './components/help/help.component';

const routes: Routes = [
  { path: 'page/:id', component: PlotsComponent },
  { path: 'help', component: HelpComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
