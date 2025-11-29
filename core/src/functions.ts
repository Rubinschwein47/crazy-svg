import {StringManipulator} from "./types";

export function stringMultiply({base,amount}:StringManipulator):string {
    var local = "";
    for (var i = 0; i < amount; i++) {
        local +=base;
    }

    return local;
}
/*
    @summary lol
    @param number r is the Radius in px
 */
export function simpleCircle(r:number):string{
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${r*2}" height="${r*2}">
        <circle r="${r}" cx="${r}" cy="${r}" fill="green"/>
        </svg>`
}