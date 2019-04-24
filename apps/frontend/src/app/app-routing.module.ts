import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlotsComponent } from './components/plots/plots.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DocsComponent } from './components/docs/docs.component';

const routes: Routes = [
  { path: 'plots', component: PlotsComponent },
  { path: 'docs', component: DocsComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
