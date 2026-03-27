import { Component } from "../core/utils/component";
import { Transform2D } from "../transform2d/transform2D";

export class BoxCollide2D extends Component{
    width: number
    height: number
    offsetX = 0
    offsetY = 0

    constructor(width: number, height: number) {
        super()
        this.width = width
        this.height = height
    }

    getBounds(transform: Transform2D) {
        return {
            left: transform.position.x + this.offsetX,
            right: transform.position.x + this.offsetX + this.width,
            top: transform.position.y + this.offsetY,
            bottom: transform.position.y + this.offsetY + this.height,
        }
    }
}