import { Scene } from "@framekore-engine/core";
import { Level1 } from "./Level1";

export class Menu extends Scene {
    public init(): void {
        
    }

    public update(dt: number): void {
        if (this.engine.input.isKeyDown('Enter')){
            this.engine.setScene(new Level1(this.engine))
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#306082"
        ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("MEU JOGO 2D", ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.font = '16px Arial';
        ctx.fillText("Pressione ENTER para iniciar", ctx.canvas.width / 2, ctx.canvas.height / 2 + 40);}
}