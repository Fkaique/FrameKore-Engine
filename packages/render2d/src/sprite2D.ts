import { Component } from "../../core";
import type { Frame, Texture } from "./texture";

export const SPRITE_2D = Symbol("sprite2d")

export class Sprite2D extends Component{
    static key = SPRITE_2D
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