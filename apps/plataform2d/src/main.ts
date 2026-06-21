import { Engine } from "@framekore/core";
import { assetManager } from "@framekore/asset-manager";
import { inputPlugin } from "@framekore/input-manager";
import { physics2d } from "@framekore/physics2d";
import { render2d } from "@framekore/render2d";
import { Cena } from "./Scenes/cena";

const canvas = document.createElement("canvas");
canvas.width = 800
canvas.height = 800
canvas.style.backgroundColor = '#3f8680'
document.body.append(canvas);
const engine = new Engine()
  .use(inputPlugin())
  .use(render2d(canvas))
  .use(physics2d())
  .use(assetManager())

engine.setScene(new Cena(engine));

engine.start();
