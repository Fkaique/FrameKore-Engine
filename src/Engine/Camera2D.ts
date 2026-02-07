import { Vector2 } from "../Utils/Vector2";
import type { GameObject } from "./GameObject";

export class Camera2D {
    /**
     * Posição da camera
     * @example camera.position = new Vector2(0,0) 
     */
    position: Vector2 = new Vector2(0,0)
    /**
     * Objeto que será seguido pela camera
     * @example
     * const player = new Player(...)
     * camera.target = player
     */
    target: GameObject | null = null
    /**
     * Velocidade em que a camera se aproxima do target
     */
    learpFactor: number = 5
    /**
     * Largura da camera
     */
    width: number
    /**
     * Altura da camera
     */
    height: number
    /**
     * Limita o mapa em que a camera pode se mover em um retangulo
     * @example camera.bounds = {
        .   x: 0,
        .   y: 0,
        .   width: 1600,
        .   height: 600
        }
     */
    bounds: {x: number, y: number, width: number, height: number} | null = null
    /**
     * Cria uma borda invisivel na janela que move a camera quando o target tenta ultrapassa-la
     * @example 
     * horizontal = 200
     * vertival = 200
     * camera.border = new Vector2(horizontal, vertical) 
     */
    border: Vector2 | null = null

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }
    /**
     * update: Processa a lógica da cena.
     * @param dt Delta Time vindo da FKEngine.
     */
    update(dt: number) {
        if (!this.target) return

        if (this.border) {
            // Posição atual do player na tela (em relação à câmera)
            const playerScreenX = this.target.position.x - this.position.x;
            const playerScreenY = this.target.position.y - this.position.y;

            let targetX = this.position.x;
            let targetY = this.position.y;

            // Se o player passar da borda DIREITA
            if (playerScreenX > this.width - this.border.x) {
                targetX = this.target.position.x - (this.width - this.border.x);
            }
            // Se o player passar da borda ESQUERDA
            else if (playerScreenX < this.border.x) {
                targetX = this.target.position.x - this.border.x;
            }

            // Se o player passar da borda de BAIXO
            if (playerScreenY > this.height - this.border.y) {
                targetY = this.target.position.y - (this.height - this.border.y);
            }
            // Se o player passar da borda de CIMA
            else if (playerScreenY < this.border.y) {
                targetY = this.target.position.y - this.border.y;
            }

            // Aplica os limites do mapa (Bounds) que fizemos antes
            if (this.bounds) {
                targetX = Math.max(this.bounds.x, Math.min(targetX, this.bounds.width - this.width));
                targetY = Math.max(this.bounds.y, Math.min(targetY, this.bounds.height - this.height));
            }

            // Suavização (Lerp)
            this.position.x += (targetX - this.position.x) * this.learpFactor * dt;
            this.position.y += (targetY - this.position.y) * this.learpFactor * dt;
        
        } else {
            let targetX = this.target.position.x - this.width / 2 + this.target.size.x / 2
            let targetY = this.target.position.y - this.height / 2 + this.target.size.y / 2

            if (this.bounds) {
                targetX = Math.max(this.bounds.x, Math.min(targetX, this.bounds.width - this.width))
                targetY = Math.max(this.bounds.y, Math.min(targetY, this.bounds.height - this.height))
            }

            this.position.x += (targetX - this.position.x) * this.learpFactor * dt
            this.position.y += (targetY - this.position.y) * this.learpFactor * dt
        }
    
    }
    /**
     * apply: desenha a camera na posição certa de acordo com a posição do target
     * @param ctx 
     */
    apply(ctx: CanvasRenderingContext2D) {
        ctx.translate(Math.floor(-this.position.x), Math.floor(-this.position.y));
    }
    
}