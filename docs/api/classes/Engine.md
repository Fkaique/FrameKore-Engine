[@framekore-engine/core](../globals.md) / Engine

# Class: Engine

Defined in: [Engine/Engine.ts:7](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Engine.ts#L7)

## Constructors

### Constructor

> **new Engine**(`canvas`): `Engine`

Defined in: [Engine/Engine.ts:18](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Engine.ts#L18)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `canvas` | `HTMLCanvasElement` |

#### Returns

`Engine`

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="assets"></a> `assets` | `readonly` | [`AssetManager`](AssetManager.md) | `undefined` | [Engine/Engine.ts:8](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Engine.ts#L8) |
| <a id="ctx"></a> `ctx` | `readonly` | `CanvasRenderingContext2D` | `undefined` | [Engine/Engine.ts:9](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Engine.ts#L9) |
| <a id="currentscene"></a> `currentScene` | `public` | [`Scene`](Scene.md) \| `null` | `null` | [Engine/Engine.ts:16](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Engine.ts#L16) |
| <a id="input"></a> `input` | `readonly` | [`InputManager`](InputManager.md) | `undefined` | [Engine/Engine.ts:10](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Engine.ts#L10) |
| <a id="time"></a> `time` | `readonly` | [`Time`](Time.md) | `undefined` | [Engine/Engine.ts:11](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Engine.ts#L11) |

## Methods

### getScene()

> **getScene**(): [`Scene`](Scene.md) \| `null`

Defined in: [Engine/Engine.ts:40](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Engine.ts#L40)

#### Returns

[`Scene`](Scene.md) \| `null`

***

### setScene()

> **setScene**(`scene`): `void`

Defined in: [Engine/Engine.ts:35](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Engine.ts#L35)

Define a Cena atual do jogo

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `scene` | [`Scene`](Scene.md) |

#### Returns

`void`

#### Example

```ts
setScene(new Level1(engine: FKEngine))
```
