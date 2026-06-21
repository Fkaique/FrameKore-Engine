import { Sprite2D } from "./sprite2D";
import type { Frame } from "./texture";

/**
 * Componente para renderização de sprites animados a partir de uma spritesheet.
 * Estende a funcionalidade do Sprite2D para gerenciar trocas de frames por tempo.
 */
export class AnimatedSprite2D extends Sprite2D {
    /** @internal Lista de frames que compõem a animação atual. */
    #frames: Frame[] = [];
    /** @internal Índice do frame sendo exibido no momento. */
    #currentFrame = 0;
    /** @internal Acumulador de tempo desde a última troca de frame. */
    #elapsed = 0;

    /** Velocidade da animação em Frames Por Segundo. */
    fps = 10;
    /** Define se a animação deve ser processada no loop. */
    playing = true;

    /**
     * Adiciona um novo frame à lista de animação com base em coordenadas da textura.
     * @param x Posição X (em pixels ou índice) do frame na textura.
     * @param y Posição Y (em pixels ou índice) do frame na textura.
     */
    addFrame(x: number, y: number): void {
        const frame = this.texture.getFrame(x, y);
        if (frame) {
            this.#frames.push(frame);
            // Define o primeiro frame adicionado como o frame visual atual
            if (this.#frames.length === 1) this.frame = frame;
        }
    }

    /**
     * Atualiza o estado da animação com base no tempo decorrido.
     * @param delta Tempo decorrido desde o último frame (em segundos).
     */
    update(delta: number): void {
        if (!this.playing || this.#frames.length === 0) return;

        this.#elapsed += delta;
        const frameDuration = 1 / this.fps;

        // Loop para lidar com casos onde o delta é maior que a duração do frame (catch-up)
        while (this.#elapsed >= frameDuration) {
            this.#elapsed -= frameDuration;
            this.#currentFrame = (this.#currentFrame + 1) % this.#frames.length;
            this.frame = this.#frames[this.#currentFrame];
        }
    }

    /**
     * Inicia ou retoma a reprodução da animação.
     */
    play(): void {
        this.playing = true;
    }

    /**
     * Pausa a reprodução da animação no frame atual.
     */
    stop(): void {
        this.playing = false;
    }

    /**
     * Define manualmente o frame atual da animação.
     * @param index O índice do frame na lista interna.
     */
    setFrame(index: number): void {
        if (index >= 0 && index < this.#frames.length) {
            this.#currentFrame = index;
            this.frame = this.#frames[index];
            this.#elapsed = 0;
        }
    }
}