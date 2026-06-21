import { Engine } from "@framekore/core";
import { inputPlugin } from "@framekore/input-manager";

const engine = new Engine()
  engine.use(inputPlugin())
  

engine.start()

