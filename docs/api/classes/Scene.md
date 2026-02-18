[@framekore-engine/core](../globals.md) / Scene

# Abstract Class: Scene

Defined in: [Engine/Scene.ts:15](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Scene.ts#L15)

## Constructors

### Constructor

> **new Scene**(`engine`): `Scene`

Defined in: [Engine/Scene.ts:20](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Scene.ts#L20)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `engine` | [`Engine`](Engine.md) |

#### Returns

`Scene`

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="engine"></a> `engine` | `protected` | [`Engine`](Engine.md) | `undefined` | [Engine/Scene.ts:16](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Scene.ts#L16) |
| <a id="entities"></a> `entities` | `protected` | [`GameObject`](GameObject.md)[] | `[]` | [Engine/Scene.ts:18](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Scene.ts#L18) |

## Methods

### add()

> **add**(`entity`): `void`

Defined in: [Engine/Scene.ts:67](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Scene.ts#L67)

add: adiciona objetos a lista podendo ser acessado usando getEntities()

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entity` | [`GameObject`](GameObject.md) | GameObject |

#### Returns

`void`

#### Example

```ts
add(new Player(...))
```

***

### cleanup()

> **cleanup**(): `void`

Defined in: [Engine/Scene.ts:80](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Scene.ts#L80)

remove todas as entidades com active === false

#### Returns

`void`

***

### draw()

> **draw**(`ctx`): `void`

Defined in: [Engine/Scene.ts:56](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Scene.ts#L56)

draw: Renderiza os elementos da cena respeitando as camadas.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ctx` | `CanvasRenderingContext2D` | Contexto 2D do Canvas. |

#### Returns

`void`

***

### getEntities()

> **getEntities**(): readonly [`GameObject`](GameObject.md)[]

Defined in: [Engine/Scene.ts:73](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Scene.ts#L73)

Retorna um Array com todos os Objetos da cena

#### Returns

readonly [`GameObject`](GameObject.md)[]

***

### init()

> `abstract` **init**(): `void`

Defined in: [Engine/Scene.ts:34](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Scene.ts#L34)

init: Chamado uma única vez quando a cena é definida como ativa.
Útil para carregar assets, posicionar o player, etc.

#### Returns

`void`

#### Example

```ts
async init() {
       .   console.log("Level 1 Carregado!")
       .   await this.engine.assets.loadImage('assets/Lillian.png')
       .   this.add(new Player(this.engine, 100,100))
       .   this.add(new Wall(this.engine, 10,300, 200, 32))
   }
```

***

### update()

> `abstract` **update**(`dt`): `void`

Defined in: [Engine/Scene.ts:50](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Scene.ts#L50)

update: Processa a lógica da cena.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dt` | `number` | Delta Time vindo da FKEngine. |

#### Returns

`void`

#### Example

```ts
update(dt: number): void {
   .   super.update(dt)
   .   const player = this.entities.find(e => e instanceof Player)
   .   const walls = this.entities.filter(e => e instanceof Wall)
   .   if(player) {
   .       for (const wall of walls) {
   .           Physics.resolveCollision(player,wall as Wall)
   .       }
   .   }
   }
```
