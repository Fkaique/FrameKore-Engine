[@framekore-engine/core](../globals.md) / InputManager

# Class: InputManager

Defined in: [Utils/InputManager.ts:3](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/InputManager.ts#L3)

## Constructors

### Constructor

> **new InputManager**(): `InputManager`

Defined in: [Utils/InputManager.ts:6](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/InputManager.ts#L6)

#### Returns

`InputManager`

## Methods

### getAxis()

> **getAxis**(`controls?`): [`Vector2`](Vector2.md)

Defined in: [Utils/InputManager.ts:29](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/InputManager.ts#L29)

Retorna um Vector2 normalizado com a direção correspondente aos controles pressionados

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `controls` | \{ `down`: `string`; `left`: `string`; `right`: `string`; `up`: `string`; \} |
| `controls.down` | `string` |
| `controls.left` | `string` |
| `controls.right` | `string` |
| `controls.up` | `string` |

#### Returns

[`Vector2`](Vector2.md)

new Vector2(x,y).normalize() ->
x: -1 | 0 | 1, 
y: -1 | 0 | 1

***

### isKeyDown()

> **isKeyDown**(`key`): `boolean`

Defined in: [Utils/InputManager.ts:19](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/InputManager.ts#L19)

Verifica se uma tecla está sendo pressionada

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | - |

#### Returns

`boolean`
