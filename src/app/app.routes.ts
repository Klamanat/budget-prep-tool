import { Routes } from '@angular/router';
import { MainLayout } from '@layouts/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/user-pbd',
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
    ,
    {
        path: 'account-head',
        component: MainLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('@views/account-head/account-head-module').then(m => m.AccountHeadModule)
            },
        ]
    },
    {
        path: 'mail-template',
        component: MainLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('@views/mail-template/mail-template-module').then(m => m.MailTemplateModule)
            },
        ]
    },
    {
        path: 'cost-center-chain',
        component: MainLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('@views/cost-center-chain/cost-center-chain-module').then(m => m.CostCenterChainModule)
            },
        ]
    },
    {
        path: 'user-pbd',
        component: MainLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('@views/user-pbd/user-pbd-module').then(m => m.UserPBDModule)
            },
        ]
    },
    {
        path: 'budget-management',
        component: MainLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('@views/budget-management/budget-management-module').then(m => m.BudgetManagementModule)
            },
        ]
    }
];
