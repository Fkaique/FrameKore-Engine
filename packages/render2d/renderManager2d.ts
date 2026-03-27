import { definePlugin, Engine } from "../core/engine";
import type { GameObject } from "../core/gameObject";
import type { Scene } from "../core/scene";
import { Priority, type TickerDisposer } from "../core/utils/ticker";
import { Sprite2D } from "./sprite2D";
import { Texture } from "./texture";
import { Transform2D, TRANSFORM_2D } from "../transform2d/transform2D";

const sprites = new WeakMap<Engine, Set<Sprite2D>>()

export const render2d = definePlugin((canvas: HTMLCanvasElement)=>{
    let renderDisposer: TickerDisposer | undefined
    return {
        name: "render2d",
        setup(engine) {
            sprites.set(engine, new Set())
            const manager = new RenderManager2D(canvas)
            engine.setResource(RenderManager2D, manager)
            renderDisposer = engine.ticker.add(()=>manager.render(engine.currentScene), Priority.RENDER)
        },
        onComponentAdded(component) {
            const engine = component.gameObject.engine
            if (component instanceof Sprite2D) {
                sprites.get(engine)?.add(component)
            }
        },
        onComponentRemoved(component) {
            const engine = component.gameObject.engine
            if (component instanceof Sprite2D) {
                sprites.get(engine)?.delete(component)
            }
        },
        destroy() {
            renderDisposer?.dispose()
        }
    }
})


export const SPRITE_2D = Symbol("sprite2d")

export class RenderManager2D {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    constructor(canvas: HTMLCanvasElement) { 
        this.canvas = canvas
        const ctx = canvas.getContext("2d") 
        if (!ctx) {
            throw new Error("Canvas2d não disponivel.")
        }
        this.ctx = ctx
    }

    static get(engine: Engine): RenderManager2D{
        const render = engine.getResource(RenderManager2D)
        if (!render) 
            throw new Error("RenderManager2D não foi adicionado à Engine")
        return render
    }
    
    getCanvasImage(x: number, y: number, w: number, h: number) {
        const newCanvas = document.createElement('canvas')
        newCanvas.width = w
        newCanvas.height = h

        const newCtx = newCanvas.getContext('2d')!
        newCtx.drawImage(this.canvas,x,y,w,h,0,0,w,h)

        return new Texture(newCanvas)
    }

    createTexture(image: HTMLImageElement | HTMLCanvasElement) {
        return new Texture(image)
    }

    draw(callback: (ctx: CanvasRenderingContext2D) => void) {
        callback(this.ctx)
    }

    #renderSprite(transform: Transform2D, sprite: Sprite2D) {
        const f = sprite.frame!

        this.ctx.save()

        this.ctx.translate(transform.position.x, transform.position.y)
        this.ctx.rotate(transform.rotation)
        this.ctx.scale(transform.scaleX,transform.scaleY)

        this.ctx.drawImage(
            sprite.texture.image,
            f.x, f.y, f.width, f.height,
            0, 0, f.width, f.height
        )
        this.ctx.restore()
    }

    #renderObjects(obj: GameObject){
        const transform = obj.getComponent<Transform2D>(TRANSFORM_2D)
        const sprite = obj.getComponent<Sprite2D>(SPRITE_2D)

        if (!transform || !sprite || !sprite.frame) return 

        this.#renderSprite(transform, sprite)
    }

    render(scene?: Scene) {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        if (!scene) return

        const objects = scene.getObjects()
        
        for (const obj of objects) {
            this.#renderObjects(obj)

        }
    }
}
