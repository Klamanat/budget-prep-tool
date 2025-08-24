import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from './button/button';
import { Icon } from './icon/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Button,
    Icon,
  ],
  exports: [Button, Icon]
})
export class ComponentsModule { }
