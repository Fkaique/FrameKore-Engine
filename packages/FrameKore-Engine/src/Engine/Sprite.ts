import type { Engine } from "./Engine"

interface Animation {
    row: number;
    frames: number;
    speed: number;
}

export class Sprite {
    #texture: HTMLImageElement | null = null
    #path: string
    #engine: Engine
    #animations: Map<string, Animation> = new Map();
    #currentAnim: string | null = null

    
    frameX: number = 0
    frameY: number = 0
    frameWidth: number
    frameHeight: number
    
    /**
     * Rotaciona a sprite
     */
    rotation: number = 0
    /**
     * Espelha a sprite na Horizontal
     */
    flipX: boolean = false
    /**
     * Espelha a sprite na Vertical
     */
    flipY: boolean = false
    /**
     * Transparencia da sprite
     */
    alpha: number = 1.0
    
    #timer: number = 0
    #speed: number = 0.1
    #maxFrames: number = 1
    
    constructor(engine: Engine, path: string, fw: number, fh: number) {
        this.#path = path
        this.#texture
        this.#engine = engine
        this.#texture = this.#engine.assets.get(path)
        this.frameWidth = fw
        this.frameHeight = fh
    }
    /**
     * Adiciona uma animação
     * @param name Nome da Animação ("Parado"|"Correndo")
     * @param row Linha da Animação na Imagem
     * @param frames Quantidade de quadros da animação
     * @param speed Velocidade da Animação (Quanto maior mais lento)
     * @example sprite.addAnimation("parado", 0, 3, 0.3)
     */
    addAnimation(name: string, row: number, frames: number, speed: number) {
        this.#animations.set(name, {row, frames, speed})
    }
    /**
     * Roda uma animação
     * @param name nome da animação
     * @example
     * sprite.addAnimation("parado", 0, 3, 0.3)
     * sprite.play("parado")
     */
    play(name: string) {
        if (this.#currentAnim === name) return

        const anim = this.#animations.get(name)
        if (anim) {
            this.#currentAnim = name
            this.frameY = anim.row
            this.frameX = 0
            this.setAnimation(anim.frames, anim.speed)
        }
    }
    /**
     * @param max Maximo de frames da animação atual
     * @param speed Velocidade da Sprite
     */
    setAnimation(max: number, speed: number) {
        this.#maxFrames = max
        this.#speed = speed
    }
    /**
     * update: Processa a lógica da cena.
     * @param dt Delta Time vindo da FKEngine.
     */
    update(dt: number) {
        this.#timer += dt

        if (this.#timer >= this.#speed) {
            this.#timer = 0
            this.frameX++

            if (this.frameX >= this.#maxFrames) {
                this.frameX = 0
            }
        }
    }
    /**
     * Desenha a sprite
     * @param ctx 
     * @param x posição no eixo x
     * @param y posição no eixo y
     * @param w largura da sprite
     * @param h altura da sprite
     */
    draw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        if (!this.#texture) {
            this.#texture = this.#engine.assets.get(this.#path)
            return
        }

        ctx.save()

        ctx.globalAlpha = this.alpha

        ctx.translate(x + w / 2, y + h / 2)

        if (this.rotation !== 0) {
            const radians = (this.rotation * Math.PI) / 180;
            ctx.rotate(radians);
        }

        const scaleX = this.flipX ? -1 : 1;
        const scaleY = this.flipY ? -1 : 1;
        if (this.flipX || this.flipY) {
            ctx.scale(scaleX, scaleY)
        }

        ctx.drawImage(
            this.#texture,
            this.frameX * this.frameWidth,
            this.frameY * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            -w / 2, -h / 2,
            w, h
        )
        ctx.restore()
    }

}