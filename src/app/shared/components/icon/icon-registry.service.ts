// src/app/shared/icon/icon-registry.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IconRegistryService {
    private cache = new Map<string, Observable<string>>();

    constructor(private http: HttpClient) { }

    /**
     * โหลด SVG ตามชื่อจาก /assets/icons/<name>.svg
     */
    getSvg(name: string): Observable<string> {
        const key = name.trim().toLowerCase();
        if (this.cache.has(key)) return this.cache.get(key)!;

        const req$ = this.http.get(`/assets/icons/${key}.svg`, { responseType: 'text' }).pipe(
            map((raw) => this.cleanSvg(raw)),
            shareReplay(1)
        );

        this.cache.set(key, req$);
        return req$;
    }

    /**
     * Clean SVG: ลบ DOCTYPE, comment, width/height, และบังคับใช้ currentColor
     */
    private cleanSvg(svg: string): string {
        return svg
            // ตัดทุกอย่างก่อน <svg> (DOCTYPE/metadata)
            .replace(/^[\s\S]*?(?=<svg)/i, '')
            .replace(/<!--[\s\S]*?-->/g, '') // ลบ comment
            .replace(/\s(width|height)="[^"]*"/g, '') // ลบ width/height fixed
            .replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"') // ใช้ currentColor
            .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')     // ใช้ currentColor
            .trim();
    }
}
