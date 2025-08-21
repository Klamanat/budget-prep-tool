import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HomeRoutingModule } from "@views/home/home-routing-module";
import { filter } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  imports: [HomeRoutingModule, RouterOutlet, CommonModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {
  menuItems = [
    { title: 'รายการงาน', path: '/home', submenu: ['submenu1', 'submenu2'] },
    { title: 'บันทึกจัดสรร/โอนงบประมาณ', path: '/budget-allocation', submenu: ['submenu1', 'submenu2'] },
    { title: 'การจัดการข้อมูลผู้ใช้งาน', path: '/user-management', submenu: ['submenu1', 'submenu2'] },
    { title: 'การจัดการข้อมูล', path: '/data-management', submenu: ['submenu1', 'submenu2'] },
    { title: 'ข่าวประชาสัมพันธ์', path: '/news', submenu: ['submenu1', 'submenu2'] },
    { title: 'รายงาน', path: '/report', submenu: ['submenu1', 'submenu2'] }
  ];

  submenu: any = {};

  constructor(public router: Router) {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.submenu = this.menuItems.find(item => item.path === event.url) || {};
      });
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
