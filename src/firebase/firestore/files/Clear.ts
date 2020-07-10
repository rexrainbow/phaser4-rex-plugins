import { IFile, IHeader } from './IFile';
import { GetFileQuery } from './GetFileQuery';
import { DocToHeader } from './DocToHeader';

export let Clear = function (
    file: IFile
): Promise<{ userID: string, error?: any }> {

    let userID = file.userID;
    return GetFileQuery(file, userID, undefined, 'header')
        .get()
        .then(function (querySnapshot) {
            let batch = file.database.batch();
            querySnapshot.forEach(function (doc) {
                let header = DocToHeader(doc);
                batch.delete(file.rootRef.doc(header.headerDocID));
                if (header.contentDocID) {
                    batch.delete(file.rootRef.doc(header.contentDocID));
                }
            });
            return batch.commit();
        })
        .then(function () {
            file.cacheHeaders.clear();
            return Promise.resolve({
                userID: userID
            });
        })
        .catch(function (error) {
            return Promise.reject({
                error: error,
                userID: userID
            });
        });
}

export default Clear;