import { Scene } from "../Engine/Scene";
import { Vector2 } from "../Utils/Vector2";

export class Level1 extends Scene {
    #playerPos = new Vector2(100,100)
    init(): void {
        console.log("Level 1 Carregado!")
    }

    update(dt: number): void {
        const moveDir = this.engine.input.getAxis();
        this.#playerPos.add(Vector2.mul(moveDir,200 * dt))
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.#playerPos.x, this.#playerPos.y, 50, 50);
    }
}