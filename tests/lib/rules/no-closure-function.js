/**
 * @fileoverview Prevent exporting of imports from other modules.
 * @author Dejan Gitin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-closure-function"),

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
ruleTester.run("no-closure-function", rule, {

    valid: [
        {code: 'export function foo() { const b = 2; return b;}'},
    ],

    invalid: [
        {
            code: "const bar = {}; export function foo() { return bar }",
            errors: [
              {
                message: 'Cannot export a closure over module variables',
              },
            ],
          },         
        {
            code: "const bar = {}; const c = bar; export function foo() { return c }",
            errors: [
              {
                message: 'Cannot export a closure over module variables',
              },
            ],
          },         
    ]
});
