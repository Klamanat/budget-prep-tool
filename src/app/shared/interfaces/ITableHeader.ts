import { TemplateRef } from "@angular/core";

export interface ITableHeader {
    title: string;
    key?: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    slot?: TemplateRef<any>;
    sortable?: boolean;
}