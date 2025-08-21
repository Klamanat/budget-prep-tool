import { Routes } from '@angular/router';
import { MainLayout } from '@layouts/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: MainLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('@views/home/home-module').then(m => m.HomeModule)
            }
        ]
    },
    {
        path: 'report',
        component: MainLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('@views/report/report-module').then(m => m.ReportModule)
            }
        ]
    }
];
