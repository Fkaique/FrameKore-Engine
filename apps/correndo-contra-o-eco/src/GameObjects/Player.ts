import { Engine, GameObject } from "@framekore/core";
import { InputManager, inputPlugin } from "@framekore/input-manager";
import type { Vector2 } from "@framekore/math";

interface PlayerOptions {
    position: Vector2
    size: Vector2
    engine: Engine
}

export class Player extends GameObject {
    SPEED = 400
    position: Vector2
    size: Vector2
    controls = {
        up: false,
        left: false,
        down: false,
        right: false
    }
    input = new InputManager()

    constructor(options: PlayerOptions) {
        super()
        this.position = options.position  
        this.size = options.size 
        this.engine = options.engine
        InputManager.get(this.engine) 
    }

    update(_delta: number): void {
        super.update(_delta)
        this.controls = {
            up: this.input.isDown('ArrowUp'),
            left: this.input.isDown('ArrowLeft'),
            down: this.input.isDown('ArrowDown'),
            right: this.input.isDown('ArrowRight')
        }
        console.log(this.controls);
        
    }
}