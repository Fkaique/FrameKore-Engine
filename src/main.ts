import { FKEngine } from "./Engine/FKEngine"
import { Menu } from "./Scenes/Menu"

const canvas = document.getElementById('game') as HTMLCanvasElement
const engine = new FKEngine(canvas)
canvas.width = 800
canvas.height = 800

engine.setScene(new Menu(engine))