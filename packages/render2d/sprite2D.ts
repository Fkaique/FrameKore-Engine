import { Component } from "../core/utils/component";
import type { Frame, Texture } from "./texture";

export class Sprite2D extends Component{
    texture: Texture
    frame?: Frame

    constructor(texture: Texture) {
        super()
        this.texture = texture
    }

    setFrame(x: number, y: number) {
        this.frame = this.texture.getFrame(x, y)
    }

    setFrameByName(name: string) {
        this.frame = this.texture.getFrameByName(name)
    }
}