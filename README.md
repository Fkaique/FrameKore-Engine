# FrameKore Engine

FrameKore é uma **engine 2D modular em desenvolvimento**, construída em **TypeScript**, com foco em arquitetura baseada em **componentes e plugins**.

O projeto foi criado principalmente para **estudo e experimentação de arquitetura de game engines**, implementando sistemas comuns encontrados em engines modernas.

---

## ✨ Principais Conceitos

- **GameObject + Component System**
- **Scenes**
- **Game Loop (Ticker)**
- **Plugins modulares**
- **Gerenciamento de Assets**
- **Renderização 2D (Canvas)**
- **Sistema de Física simples**

---

## ⚙️ Exemplo de Uso

```ts
const engine = new Engine()
  .use(inputPlugin())
  .use(render2d(canvas))
  .use(physics2d())
  .use(assetManager())

engine.setScene(new GameScene(engine))
engine.start()
```

---

## 🧩 Sistema de Componentes

GameObjects são compostos por componentes:

```ts
const player = new GameObject()

player.addComponent(TRANSFORM_2D, new Transform2D())
player.addComponent(SPRITE_2D, new Sprite2D(texture))
player.addComponent(BOX_COLLIDE_2D, new BoxCollide2D(32, 32))

player.getComponent<BoxCollide2D>(BOX_COLLIDE_2D)
```

---

## 🔌 Plugins Atuais

### Render2D

Renderização usando **Canvas2D**, com suporte a:

- Transform2D
- Sprite2D
- spritesheet

### Physics2D

Sistema básico de física com:

- `RigidBody2D`
- `BoxCollider2D`
- colisão AABB
- gravidade

### InputManager

Gerenciamento de entrada de teclado:

```ts
const input = InputManager.get(engine)

if (input.isDown("KeyW")) {
  // mover player
}
```

### AssetManager

Sistema para carregamento e cache de assets:

```ts
const assets = AssetManager.get(engine)

const img = await assets.load("player", "image", "/player.png")
```

Suporte atual:

- imagens
- áudio
- JSON

---

## 🚧 Estado do Projeto

FrameKore ainda está em **desenvolvimento** e serve como um projeto de **aprendizado e experimentação** para arquitetura de engines.
