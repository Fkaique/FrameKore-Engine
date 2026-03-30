
import { Engine, Scene } from "@framekore/core";
import { RenderManager2D } from "@framekore/render2d";
import { Player } from "../Entities/player";

export class Cena1 extends Scene {
    constructor(engine: Engine) {
        super()
        this.engine = engine
        
        const player = new Player(engine)
        this.add(player)

    }
    update(delta: number): void {
        super.update(delta)

    }
}