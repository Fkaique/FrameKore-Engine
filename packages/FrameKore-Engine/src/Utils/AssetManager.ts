export class AssetManager {
    #storage: Map<string, any> = new Map()

    /**
     * Carrega uma imagem e a armazena no cache.
     * Retorna uma Promise que resolve quando a imagem está pronta.
    */
    async loadImage(path: string): Promise<HTMLImageElement> {
        if (this.#storage.has(path)) {
            return this.#storage.get(path)!
        }

        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = path
            img.onload = () => {
                this.#storage.set(path,img)
                resolve(img)
            }
            img.onerror = () => reject(`Erro ao carremar imagem: ${path}`)
        })
    }
    async loadAudio(path: string): Promise<HTMLAudioElement> {
        if (this.#storage.has(path)) return this.#storage.get(path)

        return new Promise((resolve, reject) => {
            const audio = new Audio()
            audio.src = path
            audio.oncanplaythrough = () => {
                this.#storage.set(path,audio)
                resolve(audio)
            }
            audio.onerror = () => reject(`Erro ao carregar audio: ${path}`)
        })
    }

    /**
     * Retorna uma imagem já carregada. 
     * Se não existir, avisa no console (útil para debug).
    */
    get(path: string): HTMLImageElement {
        const img = this.#storage.get(path)
        if (!img) {
            console.error(`Asset não encontrado: ${path}. Garanta que ele foi carregado no init().`);
        }
        return img!
    }
}