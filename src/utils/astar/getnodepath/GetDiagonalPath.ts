import { GetNodePathCallbackType } from './GetNodePathCallbackType';
import { INodeBase } from '../INodeBase';

export let GetDiagonalPath: GetNodePathCallbackType = function (
    startNode,
    endNode,
    out = []
) {

    let currNode = endNode;
    let currLogicDir: number;
    while (currNode.prevNodes.length > 0) {
        out.push(currNode);
        if ((currNode.prevNodes.length === 1) || (currLogicDir === undefined)) {
            let prevNode = currNode.prevNodes[0];
            currLogicDir = prevNode.logicDirTo(currNode);
            currNode = prevNode;
        } else {
            let prevNode: INodeBase;
            let prevLogicDir: number;
            for (let i = 0, cnt = currNode.prevNodes.length; i < cnt; i++) {
                prevNode = currNode.prevNodes[i];
                prevLogicDir = prevNode.logicDirTo(currNode);
                if (prevLogicDir !== currLogicDir) {
                    break;
                }
            }
            currLogicDir = prevLogicDir;
            currNode = prevNode;
        }
    }

    return out.reverse();
}