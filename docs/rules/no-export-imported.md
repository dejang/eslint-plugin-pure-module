# Prevent exporting of imports from other modules. (no-export-imported)

A module acting as proxy exporting the modules it's importing cannot be considered pure.


## Rule Details

This rule aims to prevent mistankingly leaking a module's dependencies to other importing modules.

Examples of **incorrect** code for this rule:

```js

import foo from 'foo';
export {foo};

export {foo} from 'foo';

```

The **correct** behavior to avoid triggering this rule is to always avoid the module acting as a proxy for other modules:

## When Not To Use It

If you're code relies on a folder structure where you have
```
   - MyPackage
        - module1.js
        - module2.js
        - index.js
```

And in you're code you are used to do

```js

import {module1} from 'MyPackage'
// or
import * from 'MyPackage'
```

This rule is then not for you. It can be argued that such patterns have a use however it is always better to be specific with imports.
```js
import module1 from 'Mypackage/module1';
```
