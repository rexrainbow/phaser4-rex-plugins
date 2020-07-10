import {
    IFile,
    IHeader, IContent, LoadResultType
} from './IFile';
import { GetFileQuery } from './GetFileQuery';


export let Load = function (
    file: IFile,
    fileID: string
): Promise<LoadResultType> {

    let userID = file.userID;
    return GetFileQuery(file, userID, fileID).get()
        .then(function (querySnapshot) {
            let header: IHeader,
                content: IContent;

            querySnapshot.forEach(function (doc) {
                let data = doc.data() as IHeader | IContent;
                switch (data.type) {
                    case 'header':
                        header = data as IHeader;
                        header.headerDocID = doc.id;
                        break;
                    case 'content':
                        content = data as IContent;
                        break;
                }
            });
            return Promise.resolve({
                userID: userID,
                fileID: fileID,
                header: header,
                content: content
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