export class Vector2 {
    x: number = 0
    y: number = 0

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    add(valor: Vector2): void{
        this.x += valor.x
        this.y += valor.y
    }
}