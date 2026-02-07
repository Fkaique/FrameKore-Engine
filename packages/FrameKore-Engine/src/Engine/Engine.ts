import { AssetManager } from '../Utils/AssetManager';
import { InputManager } from '../Utils/InputManager';
import { Time } from '../Utils/Time';
import { Audio } from './Audio';
import type { Scene } from './Scene';

export class Engine {
    readonly assets: AssetManager;
    readonly ctx: CanvasRenderingContext2D;
    readonly input: InputManager;
    readonly time: Time;
    readonly audio: Audio
    
    readonly #tickRate: number = 1 /60
    #accumulator: number = 0

    currentScene: Scene | null = null

    constructor(canvas: HTMLCanvasElement) {
        this.assets = new AssetManager();
        this.ctx = canvas.getContext('2d')!
        this.time = new Time();
        this.input = new InputManager();
        this.audio = new Audio(this)

        window.addEventListener('keydown', () => {

        }, {once: true})

        requestAnimationFrame(this.#gameLoop)
    }
    /**
     * Define a Cena atual do jogo
     * @example
     * setScene(new Level1(engine: FKEngine))
     */
    setScene(scene: Scene){
        this.currentScene = scene
        this.currentScene.init()
    }

    #gameLoop = () => {
        this.time.update()

        this.#accumulator += this.time.deltaTime

        while (this.#accumulator >= this.#tickRate) {
            if (this.currentScene){
                this.currentScene.update(this.#tickRate)
            }
            this.#accumulator -= this.#tickRate
        }

        this.#draw()

        requestAnimationFrame(this.#gameLoop)
    }

    #draw() {
        this.ctx.clearRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height)

        if (this.currentScene){
            this.currentScene.draw(this.ctx)
        }
    }

}