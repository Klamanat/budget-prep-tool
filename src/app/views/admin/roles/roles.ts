import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { ComponentsModule } from '@shared/components/components-module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  imports: [CommonModule, ComponentsModule],
  templateUrl: './roles.html',
  styleUrls: ['./roles.css'] // แก้ typo: styleUrl → styleUrls
})
export class Roles implements OnInit {
  @ViewChild('actions', { static: true }) actions!: TemplateRef<any>;

  constructor(private router: Router) { }

  headers: any[] = [];
  selectedRole: any[] = [];

  ngOnInit() {
    this.headers = [
      { title: 'Role Name', key: 'name', width: '300', align: 'center' },
      { title: 'Role description', key: 'description', sortable: true, align: 'center' },
      { title: 'Create Update', key: 'createdAt', width: '160', align: 'center' },
      { title: 'Last Update', key: 'updatedAt', width: '160', align: 'center' },
      { title: 'Edit', slot: this.actions, width: '80', align: 'center' }
    ];
  }

  data: any[] = [
    { id: '1', name: 'Admin', description: 'Administrator role', createdAt: '2023-01-01', updatedAt: '2023-01-02', actions: 'Edit' },
    { id: '2', name: 'User', description: 'Standard user role', createdAt: '2023-01-01', updatedAt: '2023-01-02', actions: 'Edit' }
  ];

  onSelectionChange(selected: any) {
    this.selectedRole = selected;
  }

  onEdit(row: any) {
    this.router.navigate(['/admin/roles/edit', row.id]);
  }

  onCreate() {
    this.router.navigate(['/admin/roles/create']);
  }
}
