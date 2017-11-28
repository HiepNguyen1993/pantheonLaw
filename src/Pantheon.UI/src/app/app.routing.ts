import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './common/auth.guard';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },   
    { path: 'home', component: HomeComponent}
];

export const RoutingDefined: ModuleWithProviders = RouterModule.forRoot(routes);
