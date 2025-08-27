import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentsModule } from '@shared/components/components-module';

@Component({
  selector: 'app-roles',
  imports: [CommonModule, ComponentsModule],
  templateUrl: './roles.html',
  styleUrl: './roles.css'
})
export class Roles implements AfterViewInit {
  @ViewChild('actions', { static: true }) actions!: TemplateRef<any>;

  headers: any[] = [];
  selectedRole: any[] = []

  ngAfterViewInit() {
    this.headers = [
      {
        title: 'Role Name',
        key: 'name',
        width: '300',
        align: 'center'
      },
      {
        title: 'Role description',
        key: 'description',
        sortable: true,
        align: 'center'
      },
      {
        title: 'Create Update',
        key: 'createdAt',
        width: '160',
        align: 'center'
      },
      {
        title: 'Last Update',
        key: 'updatedAt',
        width: '160',
        align: 'center'
      },
      {
        title: 'Edit',
        slot: this.actions,
        width: '80',
        align: 'center'
      }
    ]
  }

  data: any[] = [
    {
      name: 'Admin',
      description: 'Administrator role',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
      actions: 'Edit'
    },
    {
      name: 'User',
      description: 'Standard user role',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
      actions: 'Edit'
    }
  ];

  onSelectionChange(selected: any) {
    this.selectedRole = selected;
  }
}
