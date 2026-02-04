export class AssetManager {
    #images: Map<string, HTMLImageElement> = new Map()

    /**
     * Carrega uma imagem e a armazena no cache.
     * Retorna uma Promise que resolve quando a imagem está pronta.
    */
    async loadImage(path: string): Promise<HTMLImageElement> {
        if (this.#images.has(path)) {
            return this.#images.get(path)!
        }

        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = path
            img.onload = () => {
                this.#images.set(path,img)
                resolve(img)
            }
            img.onerror = () => {
                console.error(new Error(`Erro ao carregar imagem ${path}`))
                }
            })
    }
    /**
     * Retorna uma imagem já carregada. 
     * Se não existir, avisa no console (útil para debug).
    */
    get(path: string): HTMLImageElement {
        const img = this.#images.get(path)
        if (!img) {
            console.error(`Asset não encontrado: ${path}. Garanta que ele foi carregado no init().`);
        }
        return img!
    }
}