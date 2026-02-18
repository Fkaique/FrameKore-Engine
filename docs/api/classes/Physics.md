[@framekore-engine/core](../globals.md) / Physics

# Class: Physics

Defined in: [Engine/Physics.ts:3](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Physics.ts#L3)

## Constructors

### Constructor

> **new Physics**(): `Physics`

#### Returns

`Physics`

## Methods

### checkCollision()

> `static` **checkCollision**(`a`, `b`): `boolean`

Defined in: [Engine/Physics.ts:7](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Physics.ts#L7)

checkCollision: Verifica se dois GameObjects estão colidindo

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `a` | [`GameObject`](GameObject.md) |
| `b` | [`GameObject`](GameObject.md) |

#### Returns

`boolean`

***

### resolveCollision()

> `static` **resolveCollision**(`object1`, `object2`): `void`

Defined in: [Engine/Physics.ts:20](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Physics.ts#L20)

resolveCollision: verifica a colisão entre dois objetos: GameObject

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `object1` | [`GameObject`](GameObject.md) | GameObject |
| `object2` | [`GameObject`](GameObject.md) | GameObject |

#### Returns

`void`
