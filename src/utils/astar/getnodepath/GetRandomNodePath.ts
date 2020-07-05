import { GetNodePathCallbackType } from './GetNodePathCallbackType';
import { GetRandomItem } from '../../array/GetRandom';

export let GetRandomNodePath: GetNodePathCallbackType = function (
    startNode,
    endNode,
    out = []
) {

    let currNode = endNode;
    while (currNode.prevNodes.length > 0) {
        out.push(currNode);
        if (currNode.prevNodes.length === 1) {
            currNode = currNode.prevNodes[0];
        } else {
            currNode = GetRandomItem(currNode.prevNodes);
        }
    }

    return out.reverse();
}