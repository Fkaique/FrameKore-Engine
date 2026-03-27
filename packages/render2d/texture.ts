
export type Frame = { x: number, y: number, width: number, height: number }

export class Texture {
    readonly image: HTMLCanvasElement | HTMLImageElement
    #frames: Map<string, Frame> = new Map()
    #namedFrames: Map<string, Frame> = new Map()

    constructor(source: HTMLImageElement | HTMLCanvasElement) {
        this.image = source
    }
    /**
     * Organiza uma imagem (sprite sheet) em pedaços do mesmo tamanho criando automaticamente 
     * os frames que são acessíveis por coordenadas. 
     * @param frameW Largura de um Frame.
     * @param frameH Altura de um Frame.
     */
    slice(frameW: number, frameH: number) {
        //tamanho de cada imagem
        const cols = Math.floor(this.image.width / frameW)
        const rows = Math.floor(this.image.height / frameH)

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                this.#frames.set(`${j}-${i}`,
                    {
                        x: j * frameW,
                        y: i * frameH,
                        width: frameW,
                        height: frameH
                    }
                )
            }
        }
    }


    getFrame(x: number, y: number) {
        return this.#frames.get(`${x}-${y}`)
    }

    define(name: string, x: number, y: number) {
        const frame = this.getFrame(x, y)
        if (!frame) return
        this.#namedFrames.set(name, frame)
    }
    
    getFrameByName(name: string) {
        return this.#namedFrames.get(name)
    }
}
