/**
 * @fileoverview Rule to detect exports of objects declared outside of the scope of current export -- globals
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
            description: "Rule to detect exports of objects declared outside of the scope of current export -- globals",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {
        const message = 'Export must reference a variable declared in module\'s scope';  
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
        function validator(vars, def) {
            if (def.node.type === 'VariableDeclarator' && def.node.init.type === 'Identifier') {                
                return Util.findNodeInArr(vars, def, validator);
            }            
            return true;
        }
        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            ExportNamedDeclaration: function(node) {
                const vars = context.getScope().variables;
                
                if (node.declaration.type === 'VariableDeclaration') {
                    const declarations = node.declaration.declarations;
                    declarations.forEach(d => {
                        if (d.type === 'VariableDeclarator') {
                            if (d.init.type === 'Identifier' && !Util.findNodeInArr(vars, d.init, validator)) {
                                context.report({node, message});
                            } else if (d.init.type === 'MemberExpression' && !Util.findNodeInArr(vars, d.init, validator)) {
                                context.report({node, message});
                            } else if (d.init.type === 'ObjectExpression') {
                                console.log('object expression');
                            } else if (d.init.type === 'ArrayExpression') {
                                console.log('array expression');
                            } else if (d.init.type === 'FunctionExpression') {
                                console.log('function expression');
                            }                           
                        }
                    })
                }
            }

        };
    }
};
