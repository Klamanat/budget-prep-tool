  import { CommonModule } from '@angular/common';
  import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { HomeRoutingModule } from "@views/home/home-routing-module";

  @Component({
    selector: 'app-main-layout',
    imports: [HomeRoutingModule, RouterOutlet, CommonModule],
    templateUrl: './main-layout.html',
    styleUrl: './main-layout.css'
  })
  export class MainLayout implements OnInit, OnDestroy {
    menuItems = [
      { title: 'รายการงาน', route: '/item1' },
      { title: 'บันทึกจัดสรร/โอนงบประมาณ', route: '/item2' },
      { title: 'การจัดการข้อมูลผู้ใช้งาน', route: '/item3' },
      { title: 'การจัดการข้อมูล', route: '/item4' },
      { title: 'ข่าวประชาสัมพันธ์', route: '/item5' },
      { title: 'รายงาน', route: '/item6' }
    ];

    mobileMenuOpen = false;
    openDropdownIndex: number | null = null;

  screenIsMobile(): boolean {
    return window.innerWidth <= 768;
  }

    private handleClickOutside = (event: MouseEvent) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.openDropdownIndex = null;
        this.mobileMenuOpen = false;
      }
    };

    constructor(private elementRef: ElementRef) {}

    ngOnInit() {
      document.addEventListener('click', this.handleClickOutside, true);
    }

    ngOnDestroy() {
      document.removeEventListener('click', this.handleClickOutside, true);
    }

    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      if (!this.mobileMenuOpen) {
        this.openDropdownIndex = null;
      }
    }

    toggleDropdown(idx: number) {
      this.openDropdownIndex = this.openDropdownIndex === idx ? null : idx;
    }
  }
