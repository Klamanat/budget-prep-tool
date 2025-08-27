import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from './button/button';
import { Icon } from './icon/icon';
import { Table } from './table/table';
import { Select } from './select/select';
import { InputComponent } from './input/input';
import { Textarea } from './textarea/textarea';
import { Checkbox } from './checkbox/checkbox';
import { Alert } from './alert/alert';
import { Radio } from './radio/radio';
import { MenuItem } from './menu-item/menu-item';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Button,
    Icon,
    Table,
    Select,
    InputComponent,
    Textarea,
    Checkbox,
    Alert,
    Radio,
    MenuItem,
  ],
  exports: [Button, Icon, Table, Select, InputComponent, Textarea, Checkbox, Alert, Radio, MenuItem]
})
export class ComponentsModule { }
