import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
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
          title: 'การจัดการข้อมูล',
          icon: 'report-gantt',
          submenu: [
            {
              title: 'การจัดการหัวบัญชี',
            },
            {
              title: 'จัดการ Mail Template',
            },
            {
              title: 'จัดการหน่วยงาน [Cost Center Chain]',
            },
            {
              title: 'การจัดการ User PBD',
            },
            {
              title: 'การจัดการงบวงเงิน',
            }
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
      submenu: [
        {
          title: 'การจัดการ Role',
          icon: 'user-cog'
        },
        {
          title: 'การจัดการ เมนู',
          icon: 'element-plus'
        },
        {
          title: 'การจัดการ ผู้ใช้',
          icon: 'team-member'
        }
      ]
    }
  ];

  menus: any = {};
  openedMenu: any = null;
  activeChain: any[] = [];

  constructor(public router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.menus = this.menuItems.find(item =>
          event.urlAfterRedirects.startsWith(item.path)
        ) || {};

        this.setActiveChain(event.url);
      }
    });

  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  // toggle menu
  toggleMenu(menu: any) {
    if (this.openedMenu === menu) {
      this.openedMenu = null; // กดซ้ำปิด
    } else {
      this.openedMenu = menu; // เปิดเมนูใหม่
    }
  }

  setActiveChain(url: string) {
    this.activeChain = this.findChain([this.menus], url) || [];

    console.log(this.activeChain);
  }

  /**
 * recursive หา chain ของเมนู
 */
  private findChain(menus: any[], url: string, parents: any[] = []): any[] | null {
    for (const menu of menus) {
      const newParents = [...parents, menu];

      if (menu.path === url) {
        return newParents;
      }

      if (menu.submenu?.length) {
        const found = this.findChain(menu.submenu, url, newParents);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  // ฟัง click ข้างนอก component
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    // ตรวจสอบว่า click ไม่อยู่ใน sidebar
    if (!target.closest('.sidebar-menu')) {
      this.openedMenu = null;
    }
  }
}
