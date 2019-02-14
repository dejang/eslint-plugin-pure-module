/**
 * @fileoverview Prevent exporting of imports from other modules.
 * @author Dejan Gitin
 */
"use strict";
//------------------------------------------------------------------------------
// Dependencies
//------------------------------------------------------------------------------

const Util = require('../util')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Prevent exporting of imports from other modules.",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
        const exportValidator = function (node) {
            const exported = node.declaration || node.specifiers[0].local;
            if (exported.type === 'VariableDeclaration') {
                return;
            }            
            const vars = context.getScope ().variables;
            const found = Util.findNodeInArr (
                vars,
                exported,
                (vars, node) => {
                    return node.type !== "ImportBinding"
                }
            );

            if (!found) {
                context.report ({
                    node,
                    message: "Cannot allow re exporting imports",
                });
            }
        };

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            ExportNamedDeclaration: exportValidator,
            ExportDefaultDeclaration: exportValidator,
            ExportAllDeclaration: function(node) {
                context.report({
                    node,
                    message: "Cannot allow export all",
                })
            }
        };
    }
};
