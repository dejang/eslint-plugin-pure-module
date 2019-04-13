/**
 * @fileoverview Rule to detect exports of objects declared outside of the scope of current export -- globals
 * @author Dejan Gitin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-undeclared-export"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-undeclared-export", rule, {

    valid: [
        { code: 'export const foo = "foo"' },
        { code: 'export const foo = {foo:"boo"}' },
        { code: 'export const foo = ["boo"]' },
        { code: 'export const foo = true' },
        { code: 'export const foo = function(a) { return a + 2}' },
        { code: 'export const foo = Symbol.for("test")' },
        { code: 'const b = 32; export const a = b;' }
    ],

    invalid: [
        {
            code: 'export const a = window, b = document',
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope'
                },
                {
                    message: 'Export must reference a variable declared in module\'s scope'
                },
            ],
        },
        {
            code: 'const b = window; export const a = b',
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope',
                },
            ],
        },
        {
            code: 'const c = window; const b = c; export const a = b',
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope',
                },
            ],
        },
        {
            code: 'export const doc = window.document',
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope',
                },
            ],
        },
        {
            code: 'export const querySelector = window.document.querySelector',
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope',
                },
            ],
        },
        {
            code: 'export const doc = {win: window}',
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope',
                },
            ],
        },
        {
            code: 'export const doc = {foo: {win: window}}',
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope',
                },
            ],
        },
        {
            code: 'export const doc = [window]',
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope',
                },
            ],
        },
        {
            code: 'export const doc = ["a", [window]]',
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope',
                },
            ],
        },
        {
            code: 'export const doc = ["a", [{foo: window}]]',
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope',
                },
            ],
        },
        {
            code: 'const bad = ["a", [{foo: window}]]; export const doc = bad',
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope',
                },
            ],
        },
        {
            code: `
                const bad = ["a", [{foo: window}]]; 
                const fake = bad;
                export const doc = fake;
            `,
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope',
                },
            ],
        },
        {
            code: `
                const a = window;
                const bad = [a, [{foo: 'foo'}]]; 
                const fake = bad;
                export const doc = fake;
            `,
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope',
                },
            ],
        },
        {
            code: "export const foo = globalThis;",
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope',
                },
            ],
        },
        {
            code: "export const foo = () => globalThis;",
            errors: [
                {
                    message: 'Export must reference a variable declared in module\'s scope',
                },
            ],
        },
    ]
});
