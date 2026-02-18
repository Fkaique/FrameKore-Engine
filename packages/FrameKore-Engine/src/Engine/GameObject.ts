import { Vector2 } from "../Utils/Vector2";
import { RenderLayer } from "./Scene";

export abstract class GameObject {
    /**
     * camada de renderização em que este objeto será desenhado
     */
    layer = RenderLayer.Default
    /**
     * Posição do objeto no jogo usando os eixos x e y
     */
    position: Vector2
    /**
     * Tamanho do objeto no jogo usando os eixos x e y
     */
    size: Vector2
    /**
     * Define se o objeto existe ou não
     */
    active: boolean = true

    constructor(x: number = 0, y: number = 0, w: number, h: number) {
        this.position = new Vector2(x, y)
        this.size = new Vector2(w, h)
    }

    /**
     * Retorna a posição a esquerda do Objeto 
     */
    get left() { return this.position.x }
    /**
     * Retorna a posição a direita do Objeto 
     */
    get right() { return this.position.x + this.size.x }
    /**
     * Retorna a posição a cima do Objeto 
     */
    get top() { return this.position.y }
    /**
     * Retorna a posição a baixo do Objeto 
     */
    get bottom() { return this.position.y + this.size.y }
    /**
     * update: Processa a lógica do Objeto.
     * @param dt Delta Time vindo da FKEngine.
     */
    abstract update(dt: number): void
    /**
     * Renderização do Objeto
     * @param ctx 
     */
    abstract draw(ctx: CanvasRenderingContext2D): void
}