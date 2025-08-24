import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ComponentsModule } from '@shared/components/components-module';
import { HomeRoutingModule } from "@views/home/home-routing-module";
import { filter } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  imports: [HomeRoutingModule, RouterOutlet, CommonModule, ComponentsModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {
  userDropdownOpen = false;
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  menuItems = [
    {
      title: 'การจัดการหัวบัญชี',
      path: '/account-head',
      submenu: [

      ]
    },
    {
      title: 'จัดการ Mail Template',
      path: '/mail-template',
      submenu: [
      ]
    },
    {
      title: 'จัดการหน่วยงาน [Cost Center Chain]',
      path: '/cost-center-chain',
      submenu: [
      ]
    },
    {
      title: 'การจัดการ User PBD',
      path: '/user-pbd',
      submenu: [
        { title: 'รายการงาน', path: 'list', icon: 'list-box' },
        { title: 'บันทึกจัดสรร', path: 'allocation', icon: 'archive' },
        { title: 'จัดการAdhoc', path: 'adhoc', icon: 'task-time' },
        { title: 'การจัดการข้อมูลผู้ใช้งาน', path: 'user-management', icon: 'account-settings' },
        { title: 'การจัดการข้อมูล', path: 'data-management', icon: 'data-center' },
        { title: 'ข่าวประชาสัมพันธ์', path: 'news', icon: 'megaphone' },
        { title: 'รายงาน', path: 'report', icon: 'report' }
      ]
    },
    {
      title: 'การจัดการงบวงเงิน',
      path: '/budget-management',
      submenu: [
      ]
    },
  ];

  menus: any = {};

  constructor(public router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.menus = this.menuItems.find(item =>
          event.urlAfterRedirects.startsWith(item.path)
        ) || {};
      }
    });

  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
