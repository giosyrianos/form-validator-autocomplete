import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFormComponent } from './components/main-form/main-form.component';
import { ResultsComponent } from './components/results/results.component';


const routes: Routes = [
	{ path: '', component: MainFormComponent },
	{ path: 'thankyou', component: ResultsComponent },
	{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
