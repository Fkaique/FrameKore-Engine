import type { Component } from "./component"

export type ComponentClass<T extends Component = Component> = {
    new(...args: any[]): T
    key?: symbol
}

export type ComponentKey<T extends Component = Component> =
    | symbol
    | ComponentClass<T>