# Rule to detect exports of objects declared outside of the scope of current export -- globals (no-undeclared-export)

This rule aims to prevent exporting values that have not been defined in the current's module scope. 
A value or property of object that has been defined on the global scope is not purifiable, therefor the module exporting it is not pure. 

## Rule Details

Prevent exporting objects that have been defined in different scope (global);

Examples of **incorrect** code for this rule:

```js

export const a = window;
export const doc = window.document
export const querySelector = window.document.querySelector
export const out = {foo: {win: window}}
export const out = ["a", [window]]
export const a = () => {
    return window;
}
export class Foo {
    constructor() {
        this.win = window;
    }
}
```
