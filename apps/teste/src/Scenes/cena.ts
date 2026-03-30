import { Engine, Scene } from "@framekore/core";
import { Player } from "../Entities/player";
import { Collision } from "../Entities/collision";
import { NPC } from "../Entities/npc";
import { Vector2 } from "@framekore/math";
import { RenderManager2D, SPRITE_2D } from "@framekore/render2d";
import { Transform2D, TRANSFORM_2D } from "@framekore/transform2d";
import { BOX_COLLIDE_2D, type BoxCollide2D } from "@framekore/physics2d";


export class Cena extends Scene {
    engine: Engine
    render: RenderManager2D
    constructor(engine: Engine) {
        super()
        this.engine = engine
        this.render = RenderManager2D.get(this.engine)
    }
    onEnter(): void {
        const player = new Player(this.engine)
        const npc = new NPC(this.engine)
        const paredeLeft = new Collision({
            engine: this.engine,
            width: 32,
            height: 800,
            position: new Vector2(0, 0)
        })
        const paredeRight = new Collision({
            engine: this.engine,
            width: 800,
            height: 32,
            position: new Vector2(0, this.render.canvas.height-32)
        })
        this.add(paredeLeft)
        this.add(paredeRight)
        this.add(npc)
        this.add(player)
    }
    update(delta: number): void {
        super.update(delta)
        const objs = this.getObjects()

        for (const obj of objs) {
            const transformer = obj.getComponent<Transform2D>(TRANSFORM_2D)
            const box = obj.getComponent<BoxCollide2D>(BOX_COLLIDE_2D)
            const sprite = obj.hasComponent(SPRITE_2D)
            if (!transformer || !box || sprite)
                return
            this.render.draw((ctx) => {
                ctx.fillStyle = 'black'
                ctx.fillRect(
                    transformer.position.x,
                    transformer.position.y,
                    box.width * transformer.scaleX,
                    box.height * transformer.scaleY
                )
            })
        }
    }
}