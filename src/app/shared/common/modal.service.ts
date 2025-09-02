// modal.service.ts
import { Injectable, ComponentRef, ApplicationRef, EnvironmentInjector, createComponent } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modalRef?: ComponentRef<ModalComponent>;

    constructor(private environmentInjector: EnvironmentInjector, private appRef: ApplicationRef) { }

    private open(type: 'confirm' | 'delete' | 'warning' | 'success', title: string, message: string): Promise<boolean> {
        return new Promise(resolve => {
            if (this.modalRef) return resolve(false); // ถ้ามี modal เปิดอยู่แล้ว

            this.modalRef = createComponent(ModalComponent, { environmentInjector: this.environmentInjector });
            this.modalRef.instance.type = type;
            this.modalRef.instance.title = title;
            this.modalRef.instance.message = message;

            this.modalRef.instance.closed.subscribe(result => {
                this.close();
                resolve(result);
            });

            this.appRef.attachView(this.modalRef.hostView);
            document.body.appendChild(this.modalRef.location.nativeElement);
        });
    }

    confirm(title: string = 'ต้องการยืนยัน ก่อนทำรายการ', message = ''): Promise<boolean> {
        return this.open('confirm', title, message);
    }

    warning(title: string = 'รายละเอียด การแจ้งเตือน', message = ''): Promise<boolean> {
        return this.open('warning', title, message);
    }

    success(title: string = 'ทำรายการสำเร็จ', message = 'ทำรายการสำเร็จ'): Promise<boolean> {
        return this.open('success', title, message);
    }

    delete(): Promise<boolean> {
        return this.open('delete', 'ยืนยันการลบรายการ', 'ต้องการลบรายการที่เลือกนี้ ใช่หรือไม่ ?');
    }

    close() {
        if (!this.modalRef) return;
        this.appRef.detachView(this.modalRef.hostView);
        this.modalRef.destroy();
        this.modalRef = undefined;
    }
}
