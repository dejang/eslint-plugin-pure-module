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

        found = validator(def);
    });
    return found;
}

module.exports = {
    findNodeInArr,
};
