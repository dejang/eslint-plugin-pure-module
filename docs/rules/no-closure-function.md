# Prevent exporting of private module variables through function closures. (no-closure-function)

A module exporting a function which has a closure over internal module variables cannot be considered pure.


## Rule Details

This rule aims to prevent mistankingly leaking a module's internal variables by using function closures.

Examples of **incorrect** code for this rule:

```js

const foo = {
    bar: 'foobar'
}

export function wrong() {
    return foo;
}

```

The **correct** behavior to avoid triggering this rule is to always avoid using closures over variables declared internally on the ES module.

