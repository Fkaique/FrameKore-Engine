import { Vector2 } from "./Vector2"

export class InputManager {
    #keys: Record<string,boolean> = {}

    constructor() {
        window.addEventListener('keydown',(e)=>{
            this.#keys[e.code] = true
        })
        window.addEventListener('keyup',(e)=>{
            this.#keys[e.code] = false
        })
    }

    isKeyDown(key: string): boolean {
        return !!this.#keys[key]
    }

    getAxis(): Vector2 {
        let x = 0
        let y = 0

        if (this.isKeyDown('KeyW') || this.isKeyDown('ArrowUp')) y -= 1;
        if (this.isKeyDown('KeyS') || this.isKeyDown('ArrowDown')) y += 1;
        if (this.isKeyDown('KeyA') || this.isKeyDown('ArrowLeft')) x -= 1;
        if (this.isKeyDown('KeyD') || this.isKeyDown('ArrowRight')) x += 1;

        return new Vector2(x,y).normalize();
    }
}