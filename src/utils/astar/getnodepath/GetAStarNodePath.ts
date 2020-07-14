import { GetNodePathCallbackType } from './GetNodePathCallbackType';

export const GetAStarNodePath: GetNodePathCallbackType = function (
    startNode,
    endNode,
    out = []
) {

    let currNode = endNode;
    while (currNode.prevNodes.length > 0) {
        out.push(currNode);
        currNode = currNode.prevNodes[0];
    }

    return out.reverse();
}