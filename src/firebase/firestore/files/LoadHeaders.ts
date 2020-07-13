import {
    IFile,
    IHeader, LoadHeadersResultType
} from './IFile';
import { GetFileQuery } from './GetFileQuery';
import { DocToHeader } from './DocToHeader';


export function LoadHeaders(
    file: IFile
): Promise<LoadHeadersResultType> {

    const userID = file.userID;
    return GetFileQuery(file, file.userID, undefined, 'header').get()
        .then(function (querySnapshot) {

            file.cacheHeaders.clear();
            querySnapshot.forEach(function (doc: firebase.firestore.DocumentData) {
                let header = DocToHeader(doc);
                file.cacheHeaders.set(header.fileID, header);
            });
            return Promise.resolve({
                userID: userID,
                headers: file.cacheHeaders
            });
        })
        .catch(function (error) {
            return Promise.reject({
                error: error,
                userID: userID
            });
        });
}