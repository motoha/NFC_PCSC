import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
 
export const SECURE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full',
  },
   
  {
    path: '',
     
  canActivate: [AuthGuard], 
    children: [
      { path: 'pages', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },

    ]
  },
  

];