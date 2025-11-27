import {StringManipulator} from "./types";

export function stringMultiply({base,amount}:StringManipulator):string {
    var local = "";
    for (var i = 0; i < amount; i++) {
        local +=base;
    }

    return local;
}
