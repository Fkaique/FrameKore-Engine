import { Vector2 } from "../Utils/Vector2";

export abstract class GameObject {
    position: Vector2
    size: Vector2
    active: boolean = true

    constructor(x: number = 0, y: number = 0, w: number, h: number) {
        this.position = new Vector2(x, y)
        this.size = new Vector2(w, h)
    }

    get left() { return this.position.x }
    get right() { return this.position.x + this.size.x }
    get top() { return this.position.y }
    get bottom() { return this.position.y + this.size.y }

    abstract update(dt: number): void
    abstract draw(ctx: CanvasRenderingContext2D): void
}