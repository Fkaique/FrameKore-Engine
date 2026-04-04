import { AssetManager } from "@framekore/asset-manager";
import { Engine, GameObject } from "@framekore/core";
import { RenderManager2D, Sprite2D, Texture } from "@framekore/render2d";
import NPCImage from "@/assets/Lillian.png"
import { Transform2D } from "@framekore/transform2d";
import { BoxCollide2D, CollisionLayer } from "@framekore/physics2d";
import { Vector2 } from "@framekore/math";

export class NPC extends GameObject {
    sprite: Sprite2D | null = null
    position: Vector2
    body: BoxCollide2D
    constructor(engine: Engine) {
        super()
        this.engine = engine
        const assets = AssetManager.get(engine)
        this.position = new Vector2(600, 200)
        assets.load('npc', "image", NPCImage).then((img) => {
            const texture = new Texture(img)
            texture.slice(14, 24)

            this.sprite = new Sprite2D(texture)
            this.sprite.setFrame(0, 0)

            this.addComponent(this.sprite)
        })
        const transformer = new Transform2D()
        transformer.position = this.position
        transformer.scale.x = 2
        transformer.scale.y = 2
        this.body = new BoxCollide2D(14, 24, {
            isTrigger: true,
            layer: CollisionLayer.Layer2,
            mask: CollisionLayer.Layer2
        })
        this.addComponent(transformer)
        this.addComponent(this.body)
    }
    update(_delta: number): void {
        super.update(_delta)
        if (!this.body.colliding || !this.engine)
            return
        const render = RenderManager2D.get(this.engine)
        render.draw((ctx) => {
            const text = `Hello World.`

            ctx.font = "16px Arial"

            // mede o texto
            const metrics = ctx.measureText(text)
            const textWidth = metrics.width

            // altura aproximada (não tem direto, então usamos isso)
            const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

            const padding = 8

            const x = this.position.x - metrics.width/2
            const y = this.position.y - 32

            const boxWidth = textWidth + padding * 2
            const boxHeight = textHeight + padding * 2

            // fundo
            ctx.fillStyle = "gray"
            ctx.fillRect(x, y, boxWidth, boxHeight)

            // texto
            ctx.fillStyle = "white"
            ctx.fillText(
                text,
                x + padding,
                y + padding + metrics.actualBoundingBoxAscent
            )
        })
    }
}