import type { FKEngine } from "./FKEngine";

export abstract class Scene {
    engine: FKEngine
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
    public abstract update(dt: number): void;

    /**
     * draw: Renderiza os elementos da cena.
     * @param ctx Contexto 2D do Canvas.
     */
    public abstract draw(ctx: CanvasRenderingContext2D): void;
}