import {SimplePath} from "../paths/path";
import {SvgComponent, SvgStyle} from "./svgBuilder";

const cssSizeRegex = new RegExp(`[0-9]+ *(rem|px|%)`);

/*

 */
export function shapeFromPath(path: SimplePath, cssStyle: string, svgStyle?: SvgStyle): SvgComponent {
    if (!svgStyle) {
        svgStyle = {
            offsetX:"0px",
            offsetY:"0px",
            width: "100%",
            height:"100%",
            arrangeType: "offset",
        } as SvgStyle;
    }
    return {
        style: svgStyle,
        calcFunction: (svgStyle, svgBuilder) => {

            function stringToPx(percentOff:number,value?:string): number{
                if(value && cssSizeRegex.test(value)){
                    if(value.endsWith("px"))
                        return parseFloat(value);
                    if(value.endsWith("rem"))
                        return parseFloat(value)*svgBuilder.remRatio;
                    if(value.endsWith("%"))
                        return parseFloat(value)*0.01*percentOff-(2*svgBuilder.padding);
                }
                    console.error("Wrong size Format: or null",value);
                return 0;
            }
            // relativity calculation
            let offsetX = svgBuilder.padding;
            let offsetY = svgBuilder.padding;
            let width = 0;
            let height = 0;
            if(svgStyle.arrangeType === "offset"){
                offsetX += stringToPx(svgBuilder.width,svgStyle.offsetX);
                offsetY += stringToPx(svgBuilder.height,svgStyle.offsetY);
                width = stringToPx(svgBuilder.width,svgStyle.width);
                height = stringToPx(svgBuilder.height,svgStyle.height);
            }else {
                offsetX += stringToPx(svgBuilder.width,svgStyle.left);
                offsetY += stringToPx(svgBuilder.height,svgStyle.top);
                width = svgBuilder.width - svgBuilder.padding - stringToPx(svgBuilder.width,svgStyle.right) - offsetX;
                height = svgBuilder.height - svgBuilder.padding - stringToPx(svgBuilder.height,svgStyle.bottom) - offsetY;
            }

            //actual drawing
            let instruction = "M";
            path.points.forEach((point, index) => {
                instruction += (point.x * width + offsetX) + " " + (point.y * height + offsetY);
                if (index != path.points.length - 1) {
                    instruction += " L";
                }
            })
            if (path.wraparound === true) {
                instruction += " Z";
            }
            return `
                <path d="${instruction}"
                style="${cssStyle}" />`
        }
    } as SvgComponent;
}