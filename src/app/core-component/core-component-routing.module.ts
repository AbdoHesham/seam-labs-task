import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/core.index';
import { CoreComponentComponent } from './core-component.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'home'
    , pathMatch: 'full' 
  },
  {
    path: '',
    component: CoreComponentComponent,
    children: [
      {
        path: 'home',
        // canActivate: [AuthGuard],
        component:HomeComponent ,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreComponentRoutingModule {}
