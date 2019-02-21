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
            description: "Rule to detect exports of objects declared outside of the scope of current export -- globals",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [

            // fill in your schema
        ]
    },

    create(context) {
        const message = "Export must reference a variable declared in module's scope";

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            ExportNamedDeclaration(node) {
                const vars = context.getScope().variables;

                if (node.declaration && node.declaration.type === "VariableDeclaration") {
                    const declarations = node.declaration.declarations;
                    declarations.forEach(d => {
                        if (d.type !== "VariableDeclarator" || !d.init) {
                            return;
                        }

                        switch (d.init.type) {
                        case "Identifier":
                        case "MemberExpression": {
                            const nodeInCurrentScope = Util.findNodeInArr(vars, d.init, Util.recursiveVariableDeclarationValidator);
                            if (!nodeInCurrentScope) {
                                context.report({ node, message });
                            }
                            break;
                        }
                        case "ArrayExpression":
                        case "ObjectExpression": {
                            try {
                                Util.deepValidateObjectOrArray(vars, d.init);
                            } catch (e) {
                                context.report({ node, message });
                            }
                            break;
                        }
                        case "FunctionExpression":
                            break;
                        default: break;
                        }
                    });
                }
            }

        };
    }
};
