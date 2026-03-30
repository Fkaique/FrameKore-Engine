import { Engine } from "@framekore/core";
import { Cena1 } from "./Scenes/cena1";
import { inputPlugin } from "@framekore/input-manager";
import { render2d } from "@framekore/render2d";
import { assetManager } from "@framekore/asset-manager";
import { physics2d } from "@framekore/physics2d";

const canvas = document.getElementById('canvas') as HTMLCanvasElement
canvas.height = 800
const engine = new Engine()
  .use(inputPlugin())
  .use(render2d(canvas))
  .use(assetManager())
  .use(physics2d())

engine.setScene(new Cena1(engine))


engine.start()