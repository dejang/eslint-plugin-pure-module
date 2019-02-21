/**
 * A utility which iterates over an array of nodes and looks up
 * a node by name. It allows to perform an additional validation check
 * 
 * @param {Array<ASTNode>} vars An array of ASTNode
 * @param {Node} node Node to look for
 * @param {Function} validator A validator function
 * @returns {Boolean} Return whether node has been found
 */
function findNodeInArr (vars, node, validator = () => true) {
    let found = false;

    vars.forEach (v => {
        if (found) {
            return;
        }

        if (v.name !== node.name) {
            return;
        }
        const def = v.defs[0];

        if (validator(vars, def)) {
            found = def;
        }
    });
    return found;
}

/**
 * Recursively traverse an object or an array's properties
 * @param {ASTNode} node the Node to traverse
 * @param {Function} shouldTraverseFn A function validating whether should go deeper
 * @param {Function} isValidNode A function validating whether the visited node is valid
 * @returns {undefined}
 * @throws Error throws if isValidNode fails
 */
function deepTraverse (node, shouldTraverseFn = () => true, isValidNode = () => true) {
    for (const k in node) {
        const n = node[k];
        const shouldTraverse = shouldTraverseFn(n.value);
        if (shouldTraverse) {
            deepTraverse(n.value, shouldTraverseFn, isValidNode);
        }
        if (!isValidNode(n)) {
            throw new Error("validation failed");
        }        
    }
}

/**
 * 
 * @param {Array<ASTNode>} vars An array of variables in which to lookup a node
 * @param {ASTNode} node  The node to lookup
 * @returns {Boolean} Returns true of false
 */
function deepValidateObjectOrArray(vars, node) {
    const members = node.properties || node.elements;
    deepTraverse(members, (n) => {
        return n.type === "ObjectExpression" || n.type === "ArrayExpression";
    }, (n) =>{
        return !(n.value.type === "Identifier" && !findNodeInArr(vars, n.value));
    });
}

/**
 * 
 * @param {Array<ASTNode>} vars An array of variables in which to lookup a node
 * @param {ASTNode} def  The node to lookup
 * @returns {ASTNode|False} Returns the found node or false
 */
function recursiveVariableDeclarationValidator(vars, def) {
    if (!def.node.type === "VariableDeclarator") {
        return true;
    }

    if (def.node.init.type === "Identifier") {
        return findNodeInArr(vars, def.node.init, recursiveVariableDeclarationValidator);
    }

    if (def.node.init.type === "ArrayExpression" || def.node.init.type === "ObjectExpression") {
        try {
            deepValidateObjectOrArray(vars, def.node.init);
        } catch(e) {
            return false;
        }
    }
    return true;
}

module.exports = {
    findNodeInArr,
    deepTraverse,
    recursiveVariableDeclarationValidator,
    deepValidateObjectOrArray
};
