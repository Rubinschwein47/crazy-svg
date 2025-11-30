export class SvgBuilder {
    info: SvgBuildInfo;
    components: SvgComponent[];

    constructor(width: number, height: number, padding: number = 5) {
        this.info = {
            width: width,
            height: height,
            padding: padding,
            remRatio: 0
        }
        this.components = [];
    }

    addComponent(component: SvgComponent) {
        this.components.push(component);
    }

    draw(): string {
        this.info.remRatio = parseFloat(getComputedStyle(document.documentElement).fontSize);
        let total = `<svg xmlns="http://www.w3.org/2000/svg" width="${this.info.width}" height="${this.info.width}">`;
        this.components.forEach(component => {
            total += component.calcFunction(component.style, this.info);
        })
        total += `</svg>`;
        return total;
    }
}

export type SvgBuildInfo = {
    width: number;
    height: number;
    padding: number;
    remRatio: number;
}

export type SvgComponent = {
    style: SvgStyle;
    calcFunction: (svgStyle: SvgStyle, svgBuilder: SvgBuildInfo) => string;
}
export type SvgStyle = {
    // either px, rem or %
    width?: string;
    height?: string;
    offsetX?: string;
    offsetY?: string;
    // for "offset": width,height,offsetX,offsetY required. For "borders" top through bottom
    arrangeType: "offset" | "borders";
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
}