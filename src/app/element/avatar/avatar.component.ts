import { Component, Input } from '@angular/core';

/**
 * list of default colors
 */
const defaultColors = [
    '#1abc9c',
    '#3498db',
    '#f1c40f',
    '#8e44ad',
    '#e74c3c',
    '#d35400',
    '#2c3e50',
    '#7f8c8d'
];

@Component({
    selector: 'app-avatar',
    styles: [`
    img, .img {
        height:48px;
        width:48px;
        border-radius: 50%;
    }
    `],
    template: `
    <div class='img'>
        <img *ngIf="img"
        [src]="img"
        />
    </div>`
})
export class AvatarComponent {
    @Input() set data(v: any){
        if ( v ) {
            this.background = this.getRandomColor(v.uid);
            this.img = v.photoURL;
        }
    }

    background = '';
    img = '';
    _calculateAsciiCode(value: string) {
        return value.split('').map(letter => letter.charCodeAt(0))
            .reduce((previous, current) => previous + current);
    }

    getRandomColor(value: string): string {
        if (!value) {
            return 'transparent';
        }
        const asciiCodeSum = this._calculateAsciiCode(value);
        return defaultColors[asciiCodeSum % defaultColors.length];
    }
}
