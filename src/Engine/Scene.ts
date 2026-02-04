import type { FKEngine } from "./FKEngine";
import type { GameObject } from "./GameObject";

export abstract class Scene {
    protected engine: FKEngine

    protected entities: GameObject[] = []

    constructor(engine: FKEngine){
        this.engine = engine
    }

    /**
     * init: Chamado uma única vez quando a cena é definida como ativa.
     * Útil para carregar assets, posicionar o player, etc.
     */
    public abstract init(): void;

    /**
     * update: Processa a lógica da cena.
     * @param dt Delta Time vindo da FKEngine.
     */
    update(dt: number): void {
        for (const entity of this.entities){
            if (entity.active) entity.update(dt)
        }
    }

    /**
     * draw: Renderiza os elementos da cena.
     * @param ctx Contexto 2D do Canvas.
     */
    draw(ctx: CanvasRenderingContext2D): void {
        for (const entity of this.entities) {
            if (entity.active) entity.draw(ctx)
        }
    }

    add(entity: GameObject) {
        this.entities.push(entity)
    }

    getEntities(): ReadonlyArray<GameObject> {
        return this.entities
    }

    cleanup(): void {
        this.entities = this.entities.filter(e => e.active)
    }
}