import "./style.css"
import { Engine } from "@framekore-engine/core"
import { Menu } from "./Scenes/Menu"

const canvas = document.getElementById('canvas') as HTMLCanvasElement

const engine = new Engine(canvas)
canvas.width = 800
canvas.height = 800

engine.setScene(new Menu(engine))