import * as firebase from 'firebase/app';
import { IFile, IHeader, IContent } from './IFile';
import { LoadHeader } from './LoadHeader';


export let Save = function (
    file: IFile,
    fileID: string,
    header: IHeader = {},
    content?: IContent | undefined,
    updateMode: boolean = false
): Promise<{ userID: string, fileID: string, error?: any }> {

    const userID = file.userID;
    header.userID = userID;
    header.fileID = fileID;
    header.type = 'header';

    if (content) {
        content.userID = userID;
        content.fileID = fileID;
        content.type = 'content';
    }
    let writeCommand = (updateMode) ? 'update' : 'set';
    return LoadHeader(file, fileID) // Try load header
        .then(function (prevHeader) {

            let headerDocRef: firebase.firestore.DocumentReference,
                contentDocRef: firebase.firestore.DocumentReference;
            if (prevHeader) { // Overwrite file
                headerDocRef = file.rootRef.doc(prevHeader.headerDocID);
                if (content) {
                    if (prevHeader.contentDocID) {
                        contentDocRef = file.rootRef.doc(prevHeader.contentDocID);
                    } else {
                        contentDocRef = file.rootRef.doc();
                    }
                }
            } else { // Add new file
                headerDocRef = file.rootRef.doc();
                if (content) {
                    contentDocRef = file.rootRef.doc();
                }
            }

            // Don't save headerDocID to server
            if (header.hasOwnProperty('headerDocID')) {
                delete header.headerDocID;
            }
            // Save contentDocID
            if (contentDocRef) {
                header.contentDocID = contentDocRef.id;
            }

            let batch = file.database.batch();
            batch[writeCommand](headerDocRef, header);
            if (content) {
                batch[writeCommand](contentDocRef, content);
            }
            return batch.commit();
        })
        .then(function () {
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