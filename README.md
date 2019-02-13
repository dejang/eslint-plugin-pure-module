# eslint-plugin-pure-module

An Eslint plugin that will determine if an ES6 module is pure

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-pure-module`:

```
$ npm install eslint-plugin-pure-module --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-pure-module` globally.

## Usage

Add `pure-module` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "pure-module"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "pure-module/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





