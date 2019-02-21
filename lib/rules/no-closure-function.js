/**
 * @fileoverview Rule to detect exports of objects declared outside of the scope of current export -- globals
 * @author Dejan Gitin
 */
"use strict";

//------------------------------------------------------------------------------
// Dependencies
//------------------------------------------------------------------------------

const Util = require("../util");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Rule to detect a module's exported functions do not leak private values of the module ",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [

            // fill in your schema
        ]
    },

    create(context) {
        const message = "Cannot export a closure over module variables";

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            ExportNamedDeclaration(node) {
                const vars = context.getScope().variables;
                if (node.declaration && node.declaration.type === "FunctionDeclaration") {
                    node.declaration.body.body.forEach(s => {
                        if (s.type !== "ReturnStatement") {
                            return;
                        }
                        const returnValueInModule = Util.findNodeInArr(vars, s.argument, Util.recursiveVariableDeclarationValidator);
                        if (returnValueInModule) {
                            context.report({ node, message });
                        }
                    });
                }
            }

        };
    }
};
