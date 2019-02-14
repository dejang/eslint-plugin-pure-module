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
        function validateObjectOrArray(node) {
            const members = node.properties || node.elements;
            Util.deepTraverse(members, (n) => {
                return n.type === 'ObjectExpression' || n.type === 'ArrayExpression';
            }, (n) =>{
                // console.log(n.value);
                return !(n.value.type === 'Identifier' && !Util.findNodeInArr(vars, n.value));
            })
        }
        
        function validator(vars, def) {
            if (!def.node.type === 'VariableDeclarator') {
                return true;
            }

            if (def.node.init.type === 'Identifier') {
                return Util.findNodeInArr(vars, def, validator);
            }

            if (def.node.init.type === 'ArrayExpression' || def.node.init.type === 'ObjectExpression') {
                try {
                    validateObjectOrArray(def.node.init);
                } catch(e) {
                    return false;
                }
            }
            return true;
        }
        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            ExportNamedDeclaration: function(node) {
                const vars = context.getScope().variables;
                
                if (node.declaration && node.declaration.type === 'VariableDeclaration') {
                    const declarations = node.declaration.declarations;
                    declarations.forEach(d => {
                        if (d.type !== 'VariableDeclarator') {
                            return;
                        }

                        switch(d.init.type) {
                            case 'Identifier':
                            case 'MemberExpression': 
                                const nodeInCurrentScope = Util.findNodeInArr(vars, d.init, validator);
                                if (!nodeInCurrentScope) {
                                    context.report({node, message});
                                }
                                break;
                            case 'ArrayExpression':  
                            case 'ObjectExpression':
                                try {
                                    validateObjectOrArray(d.init);
                                } catch(e) {
                                    context.report({node, message});
                                }
                                break;
                            case 'FunctionExpression': 
                                console.log('not implemented');
                            default: break;
                        }
                    })
                }
            }

        };
    }
};
