export class FollowSvg {
    parentId: string;
    divId: string;
    svgId: string;

    constructor(parentId: string) {
        this.parentId = parentId;
        this.svgId = Math.random().toString(36).slice(2);
        this.divId = Math.random().toString(36).slice(2);
    }

    draw(targetX: number, targetY: number) {
        let parent = document.getElementById("string");
        if (parent == null) {
            console.error(`Unable to draw a path, Parent with id: "${this.parentId}" not found `);
            return;
        }
        let div = document.createElement(this.divId);
        let total = `<svg xmlns="http://www.w3.org/2000/svg" width="${this.info.width}" height="${this.info.width}">`;

    }
}

