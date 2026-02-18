import { AssetManager } from '../Utils/AssetManager';
import { InputManager } from '../Utils/InputManager';
import { Time } from '../Utils/Time';
// import { Audio } from './Audio';
import type { Scene } from './Scene';

export class Engine {
    /**
     * Instancia de AssetManager, responsavel por carregar assets
     */
    readonly assets: AssetManager;
    /**Renderiza elementos em 2D no canvas */
    readonly ctx: CanvasRenderingContext2D;
    /**Instancia de InputManager */
    readonly input: InputManager;
    /**Instancia de Time, responsavel por controlar o tempo de jogo */
    readonly time: Time;
    
    readonly #tickRate: number = 1 /60
    #accumulator: number = 0

    #currentScene: Scene | null = null

    constructor(canvas: HTMLCanvasElement) {
        this.assets = new AssetManager();
        this.ctx = canvas.getContext('2d')!
        this.time = new Time();
        this.input = new InputManager();

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
        this.#currentScene = scene
        this.#currentScene.init()
    }
    /**
     * Retorna a Cena atual carregada na Engine
     */
    getScene(){
        return this.#currentScene
    }
    
    #gameLoop = () => {
        requestAnimationFrame(this.#gameLoop)
        this.time.update()

        this.#accumulator += this.time.deltaTime

        while (this.#accumulator >= this.#tickRate) {
            if (this.#currentScene){
                this.#currentScene.update(this.#tickRate)
            }
            this.#accumulator -= this.#tickRate
        }

        this.#draw()

    }

    #draw() {
        this.ctx.clearRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height)

        if (this.#currentScene){
            this.#currentScene.draw(this.ctx)
        }
    }

}