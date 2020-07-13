import { IFile, IHeader } from './IFile';
import { LoadHeader } from './LoadHeader';

export function Delete(
    file: IFile,
    fileID: string
): Promise<{ userID: string, fileID: string, error?: unknown }> {

    const userID = file.userID;
    return LoadHeader(file, fileID) // Try load header
        .then(function (prevHeader: IHeader) {
            if (!prevHeader) { // File dose not exist
                return Promise.resolve();
            }

            let batch = file.database.batch();
            batch.delete(file.rootRef.doc(prevHeader.headerDocID));
            if (prevHeader.contentDocID) {
                batch.delete(file.rootRef.doc(prevHeader.contentDocID));
            }
            return batch.commit();
        })
        .then(function () {

            file.cacheHeaders.delete(fileID);
            return Promise.resolve({
                userID: userID,
                fileID: fileID
            });
        })
        .catch(function (error) {

            return Promise.reject({
                error: error,
                userID: userID,
                fileID: fileID
            });
        });
}