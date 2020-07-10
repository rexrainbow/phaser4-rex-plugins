import { IFile, IHeader } from './IFile';
import { GetFileQuery } from './GetFileQuery';
import { DocToHeader } from './DocToHeader';


export let LoadHeader = function (
    file: IFile,
    fileID: string
): Promise<IHeader> {

    let header = file.cacheHeaders.get(fileID);
    if (header && (header.userID === file.userID)) {
        return Promise.resolve(header);
    }

    // Can't find in cache headers, load from firestore        
    return GetFileQuery(file, file.userID, fileID, 'header').limit(1).get()
        .then(function (querySnapshot) {
            let header: IHeader;
            if (querySnapshot.size > 0) {
                header = DocToHeader(querySnapshot.docs[0]);
                file.cacheHeaders.set(fileID, header); // Cache it
            }
            return Promise.resolve(header);
        });
}