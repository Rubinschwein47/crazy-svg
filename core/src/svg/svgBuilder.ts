export class SvgBuilder {
    width: number;
    height: number;
    padding: number;
    remRatio: number;
    components: SvgComponent[];

    constructor(width: number, height: number, padding: number = 5) {
        this.width = width;
        this.height = height;
        this.components = [];
        this.padding = padding;
        this.remRatio = 0;
    }

    addComponent(component: SvgComponent) {
        this.components.push(component);
    }

    draw():string {
        this.remRatio = parseFloat(getComputedStyle(document.documentElement).fontSize);
        let total = `<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.width}">`;
        this.components.forEach(component => {
            total += component.calcFunction(component.style,this);
        })
        total += `</svg>`;
        return total;
    }
}

export type SvgComponent = {
    style: SvgStyle;
    calcFunction: (svgStyle: SvgStyle, svgBuilder: SvgBuilder) => string;

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