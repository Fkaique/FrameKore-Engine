export class AssetManager {
    #BASE_URL: URL = new URL(window.location.href)
    #storage: Map<string, any> = new Map()

    /**
     * Carrega uma imagem e a armazena no cache.
     * Retorna uma Promise que resolve quando a imagem está pronta.
    */
    async loadImage(url: string | URL, base = this.#BASE_URL): Promise<HTMLImageElement> {
        const normalizedURL = new URL(url, base)
        const key = normalizedURL.toString()
        
        if (this.#storage.has(key)) {
            return this.#storage.get(key)!
        }

        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = normalizedURL.toString()
            img.onload = () => {
                this.#storage.set(key,img)
                resolve(img)
            }
            img.onerror = () => reject(`Erro ao carremar imagem: ${url}`)
        })
    }
    async loadAudio(url: string | URL, base = this.#BASE_URL): Promise<HTMLAudioElement> {
        const normalizedURL = new URL(url, base)
        const key = normalizedURL.toString()
        
        if (this.#storage.has(key)) return this.#storage.get(key)
        if (this.#storage.has(key)) {
            return this.#storage.get(key)!
        }

        return new Promise((resolve, reject) => {
            const audio = new Audio()
            audio.src = normalizedURL.toString()
            audio.oncanplaythrough = () => {
                this.#storage.set(key,audio)
                resolve(audio)
            }
            audio.onerror = () => reject(`Erro ao carregar audio: ${key}`)
        })
    }

    setBaseURL(url: URL | string) {
        if (typeof url === "string") {
            this.#BASE_URL = new URL(url.replace(/\/*$/, "/"), window.location.origin)
            return
        }
        if (url instanceof URL) {
            this.#BASE_URL = url
            return
        }
        throw new TypeError("A URL base deve ser uma 'string' ou uma instancia de 'URL'")
    }

    /**
     * Retorna uma imagem já carregada. 
     * Se não existir, avisa no console (útil para debug).
    */
    get(url: URL | string, base = this.#BASE_URL): HTMLImageElement {
        const normalizedURL = new URL(url, base)
        const key = normalizedURL.toString()
        const img = this.#storage.get(key)
        if (!img) {
            console.error(`Asset não encontrado: ${normalizedURL}. Garanta que ele foi carregado no init().`);
        }
        return img!
    }
}