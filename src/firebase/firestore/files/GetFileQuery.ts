import { IFile } from './IFile';

export let GetFileQuery = function (
    file: IFile,
    userID?: string,
    fileID?: string,
    type?: string
): firebase.firestore.Query {

    let query = file.rootRef as firebase.firestore.Query;
    query = (userID) ? query.where('userID', '==', userID) : query;
    query = (fileID) ? query.where('fileID', '==', fileID) : query;
    query = (type) ? query.where('type', '==', type) : query;
    return query;
}