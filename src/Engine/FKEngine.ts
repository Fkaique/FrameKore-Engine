import { InputManager } from '../Utils/InputManager';
import { Time } from '../Utils/Time';
import type { Scene } from './Scene';

export class FKEngine {
    readonly ctx: CanvasRenderingContext2D;
    readonly time: Time;
    readonly input: InputManager;

    currentScene: Scene | null = null

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!
        this.time = new Time();
        this.input = new InputManager();
        
        requestAnimationFrame(this.#gameLoop)
    }

    setScene(scene: Scene){
        this.currentScene = scene
        this.currentScene.init()
    }

    #gameLoop = () => {
        this.time.update()

        if (this.currentScene){
            this.currentScene.update(this.time.deltaTime)
        }

        this.#draw()

        requestAnimationFrame(this.#gameLoop)
    }

    #draw() {
        this.ctx.clearRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height)

        if (this.currentScene){
            this.currentScene.draw(this.ctx)
        }

        //Desenhando FPS
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`FPS: ${Math.round(this.time.fps)}`, 40, 20);
    }

}