import { GetNodePathCallbackType } from './GetNodePathCallbackType';

export let GetLineNodePath: GetNodePathCallbackType = function (
    startNode,
    endNode,
    out = []
) {

    let currNode = endNode;
    let targetAngle = endNode.angleTo(startNode);
    while (currNode.prevNodes.length > 0) {
        out.push(currNode);
        if (currNode.prevNodes.length === 1) {
            currNode = currNode.prevNodes[0];
        } else {
            let minDeltaAngle = Infinity;
            for (let i = 1, cnt = currNode.prevNodes.length; i < cnt; i++) {
                let prevNode = currNode.prevNodes[i];
                let deltaAngle = Math.abs(endNode.angleTo(prevNode) - targetAngle);
                if (deltaAngle < minDeltaAngle) {
                    minDeltaAngle = deltaAngle;
                    currNode = prevNode;
                }
            }
        }
    }

    return out.reverse();
}