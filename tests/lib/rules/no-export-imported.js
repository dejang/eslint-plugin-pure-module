/**
 * @fileoverview Prevent exporting of imports from other modules.
 * @author Dejan Gitin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-export-imported"),

    RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig ({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
    },
    });
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-export-imported", rule, {

    valid: [
        {code: 'const foo = "bar"; export {foo}'},
        {code: `export const foo = ['a', 'b', 'c']`},
        {code: 'export const foo = window'}
    ],

    invalid: [
        {
            code: "import foo from 'foo'; export {foo};",
            errors: [
              {
                message: 'Cannot allow re exporting imports',
              },
            ],
          },
          {
            code: "import foo from 'foo'; export default foo;",
            errors: [
              {
                message: 'Cannot allow re exporting imports',
              },
            ],
          },
          {
            code: "import {foo} from 'foo'; export {foo};",
            errors: [
              {
                message: 'Cannot allow re exporting imports',
              },
            ],
          },
          {
            code: "import {foo} from 'foo'; export default foo;",
            errors: [
              {
                message: 'Cannot allow re exporting imports',
              },
            ],
          },
          {
            code: "export {boo} from 'foo'",
            errors: [
              {
                message: 'Cannot allow re exporting imports',
              },
            ],
          },
          {
            code: "export * from 'foo'",
            errors: [
              {
                message: 'Cannot allow export all',
              },
            ],
          },
    ]
});
