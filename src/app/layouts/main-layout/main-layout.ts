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
    {
      title: 'การจัดการหัวบัญชี',
      path: '/home',
      submenu: [
        { title: 'งานที่กำลังดำเนินการ', path: '/home/ongoing' },
        { title: 'งานที่เสร็จสิ้น', path: '/home/completed' }
      ]
    },
    {
      title: 'จัดการ Mail Template',
      path: '/budget-allocation',
      submenu: [
        { title: 'งานที่กำลังดำเนินการ', path: '/home/ongoing' },
        { title: 'งานที่เสร็จสิ้น', path: '/home/completed' }
      ]
    },
    {
      title: 'การจัดการข้อมูลผู้ใช้งาน',
      path: '/user-management',
      submenu: [
        { title: 'งานที่กำลังดำเนินการ', path: '/home/ongoing' },
        { title: 'งานที่เสร็จสิ้น', path: '/home/completed' }
      ]
    },
    {
      title: 'การจัดการข้อมูล',
      path: '/data-management',
      submenu: [
        { title: 'งานที่กำลังดำเนินการ', path: '/home/ongoing' },
        { title: 'งานที่เสร็จสิ้น', path: '/home/completed' }
      ]
    },
    {
      title: 'ข่าวประชาสัมพันธ์',
      path: '/news',
      submenu: [
        { title: 'งานที่กำลังดำเนินการ', path: '/home/ongoing' },
        { title: 'งานที่เสร็จสิ้น', path: '/home/completed' }
      ]
    },
    {
      title: 'รายงาน',
      path: '/report',
      submenu: [
        { title: 'รายงาน 1', path: '/report/report1' },
        { title: 'รายงาน 2', path: '/report/report2' }
      ]
    },
  ];

  menus: any = {};

  constructor(public router: Router) {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.menus = this.menuItems.find(item => item.path === event.url) || {};
      });
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
