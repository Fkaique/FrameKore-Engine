import { Engine } from "@framekore/core";
import { inputPlugin } from "@framekore/input-manager";
import { physics2d } from "@framekore/physics2d";
import { render2d } from "@framekore/render2d";
import { Cena } from "./Scenes/cena";
import { assetManager } from "@framekore/asset-manager";

const canvas = document.createElement('canvas') as HTMLCanvasElement
canvas.width = 800
canvas.height = 800
const App = document.getElementById('app') as HTMLDivElement
App.append(canvas)

const engine = new Engine()
  .use(render2d(canvas))
  .use(inputPlugin())
  .use(physics2d())
  .use(assetManager())

engine.setScene(new Cena(engine))

engine.start()