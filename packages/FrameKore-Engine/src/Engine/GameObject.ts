import { Vector2 } from "../Utils/Vector2";
import { RenderLayer } from "./Scene";

export abstract class GameObject {
    /**
     * camada de renderização em que este objeto será desenhado
     * @example RenderLayer {
    .   Background = 0,
    .   Environment = 10,
    .   Character = 20,
    .   Foreground = 30,
    .   UI = 40
    }
     */
    layer = RenderLayer.Environment
    /**
     * Posição do objeto no jogo
     * @example object.position = new Vector2(0,0)
     */
    position: Vector2
    /**
     * tamanho do objeto no jogo
     * @example object.size = new Vector2(32,32)
     */
    size: Vector2
    /**
     * Define se o objeto existe ou não
     * @example object.active = false
     */
    active: boolean = true

    constructor(x: number = 0, y: number = 0, w: number, h: number) {
        this.position = new Vector2(x, y)
        this.size = new Vector2(w, h)
    }

    /**
     * Retorna a posição a esquerda do objeto 
     */
    get left() { return this.position.x }
    /**
     * Retorna a posição a direita do objeto 
     */
    get right() { return this.position.x + this.size.x }
    /**
     * Retorna a posição a cima do objeto 
     */
    get top() { return this.position.y }
    /**
     * Retorna a posição a baixo do objeto 
     */
    get bottom() { return this.position.y + this.size.y }
    /**
     * update: Processa a lógica da cena.
     * @param dt Delta Time vindo da FKEngine.
     */
    abstract update(dt: number): void
    /**
     * Renderização do objeto
     * @param ctx 
     */
    abstract draw(ctx: CanvasRenderingContext2D): void
}