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
      title: 'หน้าหลัก',
      path: '/account-head',
      icon: 'home',
      submenu: [

      ]
    },
    {
      title: 'งบประมาณประจำปี',
      path: '/mail-template',
      icon: 'start-year',
      submenu: [
        {
          title: 'รายงานงาน',
          icon: 'report-gantt',
          submenu: [
            { title: 'รายงานงาน 1' },
            { title: 'รายงานงาน 2' }
          ]
        },
        {
          title: 'บันทึกจัดสรร',
          icon: 'archive-success-outline',
          submenu: [
            { title: 'บันทึกจัดสรร 1' },
            { title: 'บันทึกจัดสรร 2' }
          ]
        },
        {
          title: 'จัดการAdhoc',
          icon: 'task-time',
          submenu: [
            { title: 'จัดการAdhoc 1' },
            { title: 'จัดการAdhoc 2' }
          ]
        },
        {
          title: 'การจัดการข้อมูลผู้ใช้งาน',
          icon: 'user-cog',
          submenu: [
            { title: 'การจัดการข้อมูลผู้ใช้งาน 1' },
            { title: 'การจัดการข้อมูลผู้ใช้งาน 2' }
          ]
        },
        {
          title: 'ข่าวประชาสัมพันธ์',
          icon: 'speaker-phone',
          submenu: [
            { title: 'ข่าวประชาสัมพันธ์ 1' },
            { title: 'ข่าวประชาสัมพันธ์ 2' }
          ]
        },
        {
          title: 'รายงาน',
          icon: 'bookmark-report',
          submenu: [
            { title: 'รายงาน 1' },
            { title: 'รายงาน 2' }
          ]
        }
      ]
    },
    {
      title: 'งบประมาณระหว่างปี',
      path: '/cost-center-chain',
      icon: 'coins',
      submenu: [
      ]
    },
    {
      title: 'การจัดการระบบ',
      path: '/user-pbd',
      icon: 'gui-management',
      submenu: []
    }
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
