# eslint-plugin-pure-module

An Eslint plugin that will determine if an ES6 module is pure

## Requirements
ESLint >= v5.10.0

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-pure-module`:

```
// not yet published on NPM
$ npm install eslint-plugin-pure-module --save-dev


// use 
npm install https://github.com/dejang/eslint-plugin-pure-module/tarball/master --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-pure-module` globally.

## Usage

Add `pure-module` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "plugins": [
        "pure-module"
    ],
    "rules": {
        "pure-module/no-export-imported": 2,
        "pure-module/no-undeclared-export": 2,
        "pure-module/no-closure-function": 2
    }
}
```

## Supported Rules

* no-export-imported
* no-undeclared-export






