import type { Engine } from "./Engine";
import type { GameObject } from "./GameObject";

export enum RenderLayer {
    Background = 0,
    Environment = 10,
    Character = 20,
    Foreground = 30,
    UI = 40
}

export abstract class Scene {
    protected engine: Engine
    
    protected entities: GameObject[] = []

    constructor(engine: Engine){
        this.engine = engine
    }

    /**
     * init: Chamado uma única vez quando a cena é definida como ativa.
     * Útil para carregar assets, posicionar o player, etc.
     * @example async init() {
            .   console.log("Level 1 Carregado!")
            .   await this.engine.assets.loadImage('/assets/Lillian.png')
            .   this.add(new Player(this.engine, 100,100))
            .   this.add(new Wall(this.engine, 10,300, 200, 32))
        }
     */
    public abstract init(): void;

    /**
     * update: Processa a lógica da cena.
     * @param dt Delta Time vindo da FKEngine.
     * @example update(dt: number): void {
        .   super.update(dt)
        .   const player = this.entities.find(e => e instanceof Player)
        .   const walls = this.entities.filter(e => e instanceof Wall)
        .   if(player) {
        .       for (const wall of walls) {
        .           Physics.resolveCollision(player,wall as Wall)
        .       }
        .   }
        } 
    */
    abstract update(dt: number): void

    /**
     * draw: Renderiza os elementos da cena respeitando as camadas.
     * @param ctx Contexto 2D do Canvas.
     */
    draw(ctx: CanvasRenderingContext2D): void {
        const sortedEntities = [...this.entities].sort((a,b)=>a.layer - b.layer)
        for (const entity of sortedEntities) {
            if (entity.active) entity.draw(ctx)
        }
    }
    /**
     * add: adiciona objetos a lista podendo ser acessado usando getEntities()
     * @param entity GameObject
     * @example add(new Player(...))
     */
    add(entity: GameObject) {
        this.entities.push(entity)
    }
    /**
     * Retorna um Array com todos os Objetos da cena
     */
    getEntities(): ReadonlyArray<GameObject> {
        return this.entities
    }

    /**
     * remove todas as entidades com active === false
     */
    cleanup(): void {
        this.entities = this.entities.filter(e => e.active)
    }
}