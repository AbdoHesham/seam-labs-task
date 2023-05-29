import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
    import(
      './core-component/core-component.module'
    ).then((m) => m.CoreComponentModule),    
  },
  {
    path: 'auth',
    loadChildren: () =>
    import(
      './auth/auth.module'
    ).then((m) => m.AuthModule),    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
