import * as firebase from 'firebase/app';
import { IHeader } from './IFile';

export function DocToHeader(doc: firebase.firestore.DocumentData) {
    let header = doc.data() as IHeader;
    header.headerDocID = doc.id;
    return header;
}