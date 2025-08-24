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
        { title: 'รายการงาน', path: 'ongoing', icon: 'list-box' },
        { title: 'บันทึกจัดสรร', path: 'ongoing', icon: 'archive' },
        { title: 'จัดการAdhoc', path: 'ongoing', icon: 'task-time' },
        { title: 'การจัดการข้อมูลผู้ใช้งาน', path: 'ongoing', icon: 'account-settings' },
        { title: 'การจัดการข้อมูล', path: 'ongoing', icon: 'data-center' },
        { title: 'ข่าวประชาสัมพันธ์', path: 'ongoing', icon: 'megaphone' },
        { title: 'รายงาน', path: 'completed', icon: 'report' }
      ]
    },
    {
      title: 'จัดการ Mail Template',
      path: '/mail-template',
      submenu: [
        { title: 'Mail Template ที่กำลังดำเนินการ', path: 'ongoing' },
        { title: 'Mail Template ที่เสร็จสิ้น', path: 'completed' }
      ]
    },
    {
      title: 'จัดการหน่วยงาน [Cost Center Chain]',
      path: '/cost-center-chain',
      submenu: [
        { title: 'หน่วยงานที่กำลังดำเนินการ', path: 'ongoing' },
        { title: 'หน่วยงานที่เสร็จสิ้น', path: 'completed' }
      ]
    },
    {
      title: 'การจัดการ User PBD',
      path: '/user-pbd',
      submenu: [
        { title: 'User PBD ที่กำลังดำเนินการ', path: 'ongoing' },
        { title: 'User PBD ที่เสร็จสิ้น', path: 'completed' }
      ]
    },
    {
      title: 'การจัดการงบวงเงิน',
      path: '/budget-management',
      submenu: [
        { title: 'งบวงเงินที่กำลังดำเนินการ', path: 'ongoing' },
        { title: 'งบวงเงินที่เสร็จสิ้น', path: 'completed' }
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
